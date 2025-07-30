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

const getAllUserSavings = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const savings = await Saving.findAll({ where: { userId: userId } });

  if (savings) {
    res.status(200).json({
      savingsData: savings,
    });
  } else {
    res.status(404);
    throw new Error("No savings found.");
  }
});

const createUserSaving = asyncHandler(async (req, res) => {
  const { title, targetAmount, description, accountId } = req.body;

  const userId = req.user.userId;

  if (targetAmount < 0) {
    res.status(400);
    throw new Error("Negative values are not allowed.");
  }

  const newSaving = await Saving.create({
    title: title,
    targetAmount: targetAmount,
    description: description,
    userId: userId,
    accountId: accountId,
  });

  if (newSaving) {
    res.status(201).json({
      title: newSaving.title,
      targetAmount: newSaving.targetAmount,
      description: newSaving.description,
      message: "Saving created successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid saving data.");
  }
});

const updateUserSaving = asyncHandler(async (req, res) => {});

const deleteUserSaving = asyncHandler(async (req, res) => {
  const savingId = req.params.id;
  const saving = await Saving.findByPk(savingId);

  if (saving) {
    await Saving.destroy({ where: { savingId: savingId } });
    res.status(200).json({
      message: `Saving deleted successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Saving not found.");
  }
});

module.exports = {
  getUserSaving,
  getAllUserSavings,
  createUserSaving,
  updateUserSaving,
  deleteUserSaving,
};
