const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.userId);

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

const updateUserProfile = (req, res) => {
  res.status(201).json({
    message: "User profile updated Successfully.",
  });
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
