const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: "Authorization failed, please add bearer token in header",
    });
  }

  const tokenParts = req.headers.authorization.split(" ");
  if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
    return res
      .status(401)
      .json({ error: "Authorization failed, invalid token format" });
  }

  const token = tokenParts[1];

  try {
    const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
    req.user = isTokenValid;
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", error: err.message });
  }
};

module.exports = authMiddleware;
