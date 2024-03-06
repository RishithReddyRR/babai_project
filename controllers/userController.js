const { asyncErrorHandler } = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwttoken");
const user = require("../models/userModel");
//creating a user
exports.createUser = asyncErrorHandler(async (req, res, next) => {
  const u = await user.create({
    ...req.body,
  });
  sendToken(u, 200, res);
});


//user login

//user login

exports.userLogin = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //checing if both email and password are entered
  if (!email || !password) {
    return next(new ErrorHandler("enter both email and password", 400));
  }

  const u = await user.findOne({ email }).select("+password");
  if (!u) {
    return next(new ErrorHandler("no user exist with this credentials", "404"));
  }

  const isPasswordMatched = await u.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("password is incorrect", 401));
  }

  sendToken(u, 200, res);
});


//logout user
exports.logout = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged Out",
  });
});
