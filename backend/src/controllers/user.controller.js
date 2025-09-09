const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
  partitioned: true,
};

/*

Get user profile controller

*/

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId, {
    attributes: { exclude: ["password", "refreshToken"] },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  res.status(200).json({
    ...user.toJSON(),
  });
});

/*

Get user profile controlle (END)

*/

/*

Update user profile controller

*/

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  if (!req.body.firstName || !req.body.lastName) {
    res.status(400);
    throw new Error("First and last name required.");
  }

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const t = await sequelize.transaction();

  try {
    if (req.body.password) {
      if (req.body.password === req.body.confirmPassword) {
        user.password = req.body.password;
      } else {
        res.status(400);
        throw new Error("Confirm password does not match.");
      }
    }

    Object.assign(user, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      about: req.body.about,
    });

    await user.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      userId: user.userId,
      fullName: `${user.firstName} ${user.lastName}`,
      dateOfBirth: user.dateOfBirth,
      about: user.about,
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

Update user profile controller (END)

*/

/*

Delete user profile controller

*/

const deleteUserProfile = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const t = await sequelize.transaction();

  try {
    await user.destroy({ transaction: t });

    await t.commit();

    res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json({
        message:
          "Your profile and all your information is deleted successfully. We are really sad to see you go.",
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

Delete user profile controller

*/

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
