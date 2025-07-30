const asyncHandler = require("express-async-handler");
const Saving = require("../models/saving.model");

const getUserSaving = asyncHandler(async (req, res) => {
  const savingId = req.params.id;
  const saving = await Saving.findByPk(savingId);

  if (saving) {
    res.status(200).json({
      savingId: saving.savingId,
      title: saving.title,
      targetAmount: saving.targetAmount,
      currentAmount: saving.currentAmount,
      description: saving.description,
      status: saving.status,
      accountId: saving.accountId,
    });
  } else {
    res.status(404);
    throw new Error("Saving not found.");
  }
});

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
