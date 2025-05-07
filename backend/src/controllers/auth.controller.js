const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateJwtToken = require("../utils/generateJwtToken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, dateOfBirth, email, password } = req.body;

  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists.");
  }

  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    email: email,
    password: password,
  });

  if (newUser) {
    generateJwtToken(res, newUser.userId);

    res.status(201).json({
      userId: newUser.userId,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      dateOfBirth: newUser.dateOfBirth,
      email: newUser.email,
      message: `${newUser.firstName} ${newUser.lastName} Registered Successfully.`,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data.");
  }
});

const loginUser = async (req, res) => {
  res.status(200).json({
    message: "User logged in Successfully.",
  });
};

const logoutUser = async (req, res) => {
  res.status(200).json({
    message: "User logged out Successfully.",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
