const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  phone_no: {
    type: String,
    required: [true, "enter your Number please"],
    minLength: [10, "your number length should not be less than 10"],
    maxlength: [10, "Your number length should not exceed 10"],
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    validate: [validator.isEmail, "enter correct email address"],
    unique: true,
  },
  password: {
    type: String,
    select: false,
    required: [true, "please enter password"],
    minLength: [8, "your password should have minimum 8 charactors"],
  },
});

//encrypting password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

//generating token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//comparing password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
