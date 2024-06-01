const jwt = require("jsonwebtoken");
const user = require("../../Model/User");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
  try {
    if (req.body.password !== req.body.confirmPassword) {
      throw new Error("password do not match");
    }
    const resp = await user.create(req.body);
    const userObj = resp.toObject();
    delete userObj.password;
    res.status(201).json({
      data: userObj,
      status: "success",
      message: "you have registered successfully",
    });
  } catch (error) {
    res.status(404).json({
      error: error,
      status: "fail",
      message: error.message,
    });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Email and password are required",
    });
  }

  try {
    const resp = await user.findOne({ email });
    if (!resp) {
      return res.status(404).json({
        status: "fail",
        message: "Email is not valid",
      });
    }

    const isPassword = await bcrypt.compare(password, resp.password);
    if (!isPassword) {
      return res.status(401).json({
        status: "fail",
        message: "Email or password is incorrect",
      });
    }

    const userDetails = resp.toObject();
    delete userDetails.password;

    const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ status: "success", message: "Logged in successfully", token });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = { signup, login };
