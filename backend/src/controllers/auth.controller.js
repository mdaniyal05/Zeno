const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const generateJwtToken = require("../utils/generateJwtToken");
const bcrypt = require("bcryptjs");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, password } = req.body;
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, OTP } = req.body;

  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists.");
  }

  const otp = await Otp.findOne({ where: { email: email } });

  if (otp.isBlocked) {
    const currentTime = new Date();
    if (currentTime < otp.blockUntil) {
      res.status(403);
      throw new Error("You Are Blocked. Try After Some Time.");
    } else {
      otp.isBlocked = false;
      otp.OtpAttempts = 0;
    }
  }

  if (otp.otp !== OTP) {
    otp.OtpAttempts++;

    if (otp.OtpAttempts >= 3) {
      otp.isBlocked = true;
      let blockUntil = new Date();
      blockUntil.setHours(blockUntil.getHours() + 1);
      otp.blockUntil = blockUntil;
    }

    await otp.save();

    res.status(403);
    throw new Error("Invalid OTP.");
  }

  const otpCreatedTime = otp.createdAt;
  const currentTime = new Date();

  if (currentTime - otpCreatedTime > 3 * 60 * 1000) {
    res.status(403);
    throw new Error("OTP Expired.");
  }

  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  if (newUser) {
    generateJwtToken(res, newUser.userId);

    res.status(201).json({
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      message: `${newUser.firstName} ${newUser.lastName} Registered Successfully.`,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data.");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ where: { email: email } });

  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    generateJwtToken(res, userExists.userId);

    res.status(200).json({
      userId: userExists.userId,
      fullName: `${userExists.firstName} ${userExists.lastName}`,
      email: userExists.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Password or Email.");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwtToken");
  res.status(200).json({
    message: "User Logged Out Successfully.",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
