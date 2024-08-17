const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const crypto = require("crypto");

exports.registerUsers = catchAsyncError(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  let avatar;
  if (req.file) {
    avatar = `${req.protocol}://${req.hostname}:3000/uploads/user/${req.file.originalname}`
    
  }
  const user = await User.create({ name, email, password, avatar, role });
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid email or password", 400));
  }
  if (!(await user.isValidPassword(password))) {
    return next(new ErrorHandler("invalid email or password", 400));
  }

  sendToken(user, 201, res);
});

exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
    .status(200)
    .json("logged out");
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return new ErrorHandler("user not found", 404);
  }
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });
  const reseturl = `${req.protocol}://${req.get(
    "host"
  )}/api/vi/password/reset/${resetToken}`;
  const message = `your password reset url is as follows \n\n ${reseturl} \n\n If you have not requested this email,then ignore in.`;
  try {
    sendEmail({
      email: user.email,
      subject: "Amazon password recovery",
      message,
    });
    res
      .status(200)
      .json({ success: true, message: `Email sent to ${user.email}` });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message), 500);
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpired: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("password reset token is invalid expired", 401)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password doesn't match to confirm password ", 401)
    );
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordToken = undefined;
  await user.save({ validateBeforeSave: false });

  sendToken(user, 201, res);
});
//profile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.isValidPassword(req.body.oldPassword))) {
    return next(new ErrorHandler("old passwprd is incorrect", 401));
  }

  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    success: true,
  });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user });
});
// Admin routes
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = await User.find({});
  res.status(200).json({
    success: true,
    user,
  });
});
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`user not found ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
exports.updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
 
  res.status(200).json({ success: true, user });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`user not found ${req.params.id}`, 404));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    user,
  });
});
