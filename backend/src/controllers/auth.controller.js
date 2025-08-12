const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const generateJwtToken = require("../utils/generateJwtToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshTokens = async (res, userId) => {
  try {
    const user = await User.findByPk(userId);
    const accessToken = generateJwtToken(
      {
        userId: user.userId,
        email: user.email,
        fullName: `${user.firstName} ${user.lastName}`,
      },
      process.env.ACCESS_TOKEN_SECRET,
      process.env.ACCESS_TOKEN_EXPIRY
    );
    const refreshToken = generateJwtToken(
      { userId: user.userId },
      process.env.REFRESH_TOKEN_SECRET,
      process.env.REFRESH_TOKEN_EXPIRY
    );

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500);
    throw new Error(
      "Something went wrong while generating refresh and access token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, OTP } =
    req.body;

  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists.");
  }

  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Confirm password does not match.");
  }

  const otp = await Otp.findOne({ where: { email: email } });

  if (otp.isBlocked) {
    const currentTime = new Date();
    if (currentTime < otp.blockUntil) {
      res.status(403);
      throw new Error("You Are Blocked. Try After Some Time.");
    } else {
      otp.isBlocked = false;
      otp.otpAttempts = 0;
    }
  }

  const otpCreatedTime = otp.createdAt;
  const currentTime = new Date();

  if (currentTime - otpCreatedTime > 3 * 60 * 1000) {
    res.status(403);
    throw new Error("OTP Expired.");
  }

  if (otp.otp !== OTP) {
    otp.otpAttempts++;

    if (otp.otpAttempts >= 3) {
      otp.isBlocked = true;
      let blockUntil = new Date();
      blockUntil.setHours(blockUntil.getHours() + 1);
      otp.blockUntil = blockUntil;
    }

    await otp.save();

    res.status(403);
    throw new Error("Invalid OTP.");
  }

  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  if (newUser) {
    generateJwtToken(res, newUser.userId);

    await Otp.destroy({ where: { email: newUser.email } });

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
    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      res,
      userExists.userId
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: userExists.userId,
        fullName: `${userExists.firstName} ${userExists.lastName}`,
        email: userExists.email,
        message: "User logged in successfully.",
      });
  } else {
    res.status(401);
    throw new Error("Invalid Password or Email.");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findByPk(userId);

  user.refreshToken = null;

  await user.save();

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({
      message: "User logged out succesfully.",
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      res.status(401);
      throw new Error("Unauthorized request.");
    }

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      res.status(401);
      throw new Error("Invalid refresh token.");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      res.status(401);
      throw new Error("Refresh token is expired or used.");
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
      res,
      user.userId
    );

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        message: "Access token refreshed.",
      });
  } catch (error) {
    res.status(401);
    throw new Error(error?.message || "Invalid refresh token.");
  }
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
