const asyncHandler = require("express-async-handler");
const Account = require("../models/account.model");

const getUserAccount = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Account",
  });
});

const getAllUserAccounts = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "All User Accounts",
  });
});

const createUserAccount = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "User Account Created",
  });
});

const updateUserAccount = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Account Updated",
  });
});

const deleteUserAccount = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "User Account Deleted",
  });
});

module.exports = {
  getUserAccount,
  getAllUserAccounts,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
};
