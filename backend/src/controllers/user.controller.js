const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const getUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findByPk(userId);

  if (user) {
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      dateOfBirth: user.dateOfBirth,
      about: user.about,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found.");
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
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      userId: updatedUser.userId,
      fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
      dateOfBirth: updatedUser.dateOfBirth,
      about: updatedUser.about,
      phoneNumber: updatedUser.phoneNumber,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found.");
  }
});

module.exports = {
  getUserProfile,
  updateUserProfile,
};
