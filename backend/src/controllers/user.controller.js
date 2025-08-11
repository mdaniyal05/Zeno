const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  if (user) {
    res.status(200).json({
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      about: user.about,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
    user.about = req.body.about || user.about;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      if (req.body.password === req.body.confirmPassword) {
        user.password = req.body.password;
      } else {
        res.status(400);
        throw new Error("Confirm password does not match.");
      }
    }

    const updatedUser = await user.save();

    res.status(201).json({
      userId: updatedUser.userId,
      fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
      dateOfBirth: updatedUser.dateOfBirth,
      about: updatedUser.about,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};
