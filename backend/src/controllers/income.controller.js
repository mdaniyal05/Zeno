const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");

const getUserIncome = asyncHandler(async (req, res) => {});

const getAllUserIncome = asyncHandler(async (req, res) => {});

const createUserIncome = asyncHandler(async (req, res) => {});

const updateUserIncome = asyncHandler(async (req, res) => {});

const deleteUserIncome = asyncHandler(async (req, res) => {});

module.exports = {
  getUserIncome,
  getAllUserIncome,
  createUserIncome,
  updateUserIncome,
  deleteUserIncome,
};
