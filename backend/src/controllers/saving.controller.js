const asyncHandler = require("express-async-handler");

const getUserSaving = asyncHandler(async (req, res) => {});

const getAllUserSavings = asyncHandler(async (req, res) => {});

const createUserSaving = asyncHandler(async (req, res) => {});

const updateUserSaving = asyncHandler(async (req, res) => {});

const deleteUserSaving = asyncHandler(async (req, res) => {});

module.exports = {
  getUserSaving,
  getAllUserSavings,
  createUserSaving,
  updateUserSaving,
  deleteUserSaving,
};
