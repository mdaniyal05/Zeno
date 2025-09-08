const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const Otp = require("../models/otp.model");
const generateJwtToken = require("../utils/generateJwtToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

/*

Generate access and refresh token function

*/

const generateAccessAndRefreshTokens = async (res, userId) => {
  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(userId, { transaction: t });

    if (!user) {
      res.status(404);
      throw new Error("User not found.");
    }

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

    await user.save({ transaction: t });

    await t.commit();

    return { accessToken, refreshToken };
  } catch (error) {
    await t.rollback();

    if (res.statusCode === 200) {
      res.status(500);
    }

    throw new Error(error.message);
  }
};

/*

Generate access and refresh token function (END)

*/

/*

Register user controller

*/

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, OTP } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !OTP
  ) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const t = await sequelize.transaction();

  try {
    const userExists = await User.findOne({
      where: { email: email },
      transaction: t,
    });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists.");
    }

    if (password !== confirmPassword) {
      res.status(400);
      throw new Error("Confirm password does not match.");
    }

    const otp = await Otp.findOne({ where: { email: email }, transaction: t });

    if (!otp) {
      res.status(400);
      throw new Error("No OTP found for this email.");
    }

    if (otp.isBlocked) {
      const currentTime = new Date();
      if (currentTime < otp.blockUntil) {
        res.status(403);
        throw new Error("You are blocked. Try after some time.");
      } else {
        otp.isBlocked = false;
        otp.otpAttempts = 0;
      }
    }

    const otpCreatedTime = otp.createdAt;
    const currentTime = new Date();

    if (currentTime - otpCreatedTime > 3 * 60 * 1000) {
      res.status(403);
      throw new Error("OTP expired.");
    }

    if (otp.otp !== OTP) {
      otp.otpAttempts++;

      if (otp.otpAttempts >= 3) {
        otp.isBlocked = true;
        let blockUntil = new Date();
        blockUntil.setHours(blockUntil.getHours() + 1);
        otp.blockUntil = blockUntil;
      }

      await otp.save({ transaction: t });

      res.status(403);
      throw new Error("Invalid OTP.");
    }

    const newUser = await User.create(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      { transaction: t }
    );

    if (newUser) {
      await otp.destroy({ transaction: t });

      await t.commit();

      res.status(200).json({
        fullName: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        message: "User registered successfully. Now, you can login.",
      });
    }
  } catch (error) {
    await t.rollback();

    if (res.statusCode === 200) {
      res.status(500);
    }

    throw new Error(error.message);
  }
});

/*

Register user controller (END)

*/

/*

Login user controller

*/

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const t = await sequelize.transaction();

  try {
    const userExists = await User.findOne({
      where: { email: email },
      transaction: t,
    });

    if (userExists && (await bcrypt.compare(password, userExists.password))) {
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(res, userExists.userId);

      await t.commit();

      res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json({
          userId: userExists.userId,
          fullName: `${userExists.firstName} ${userExists.lastName}`,
          email: userExists.email,
          message: "User logged in successfully.",
        });
    } else {
      res.status(401);
      throw new Error("Invalid password or email.");
    }
  } catch (error) {
    await t.rollback();

    if (res.statusCode === 200) {
      res.status(500);
    }

    throw new Error(error.message);
  }
});

/*

Login user controller (END)

*/

/*

Logout user controller

*/

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const t = await sequelize.transaction();

  try {
    user.refreshToken = null;

    await user.save({ transaction: t });

    await t.commit();

    res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({
        message: "User logged out succesfully.",
      });
  } catch (error) {
    await t.rollback();

    if (res.statusCode === 200) {
      res.status(500);
    }

    throw new Error(error.message);
  }
});

/*

Logout user controller (END)

*/

/*

Refresh token controller

*/

const refreshAccessToken = asyncHandler(async (req, res) => {
  const t = await sequelize.transaction();

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

    const user = await User.findByPk(decoded?.payload.userId, {
      transaction: t,
    });

    if (!user) {
      res.status(401);
      throw new Error("Invalid refresh token.");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      res.status(401);
      throw new Error("Refresh token is expired or used.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      res,
      user.userId
    );

    await t.commit();

    res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json({
        accessToken: accessToken,
        message: "Access token refreshed.",
      });
  } catch (error) {
    await t.rollback();
    res.status(401);
    throw new Error(error?.message || "Invalid refresh token.");
  }
});

/*

Refresh token controller (END)

*/

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
