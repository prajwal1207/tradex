const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: [true, "please enter username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: true,
      lowerCase: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: [
        validator.isStrongPassword,
        "password must contain { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }",
      ],
    },
    fullName: {
      type: String,
      get: function () {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    dateOfBirth: {
      type: Date,
    },
    country: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      default: "USD",
    },
    profilePic: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastLoggedIn: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 12);
  }
  next();
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
