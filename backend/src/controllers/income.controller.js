const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");

const getUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (income) {
    res.status(200).json({
      incomeId: income.incomeId,
      incomeAmount: income.incomeAmount,
      incomeDate: income.incomeDate,
      incomeSource: income.incomeSource,
    });
  } else {
    res.status(404);
    throw new Error("Income not found.");
  }
});

const getAllUserIncomes = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const incomes = await Income.findAll({ where: { userId: userId } });

  if (incomes) {
    res.status(200).json({
      incomesData: incomes,
    });
  } else {
    res.status(404);
    throw new Error("No incomes found.");
  }
});

const createUserIncome = asyncHandler(async (req, res) => {
  const { incomeAmount, incomeDate, incomeSource } = req.body;

  if (!incomeAmount || !incomeDate || !incomeSource) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (incomeAmount <= 0) {
    res.status(400);
    throw new Error("Negative values and zero are not allowed.");
  }

  const userId = req.user.userId;

  const newIncome = await Income.create({
    incomeAmount: incomeAmount,
    incomeDate: incomeDate,
    incomeSource: incomeSource,
    userId: userId,
  });

  if (newIncome) {
    res.status(201).json({
      message: "Income created successfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid income data.");
  }
});

const updateUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (income) {
    if (req.body.incomeAmount <= 0) {
      res.status(400);
      throw new Error("Negative values and zero are not allowed.");
    }

    income.incomeAmount = req.body.incomeAmount || income.incomeAmount;
    income.incomeDate = req.body.incomeDate || income.incomeDate;
    income.incomeSource = req.body.incomeSource || income.incomeSource;

    const updatedIncome = await income.save();

    res.status(200).json({
      incomeAmount: updatedIncome.incomeAmount,
      incomeDate: updatedIncome.incomeDate,
      incomeSource: updatedIncome.incomeSource,
    });
  } else {
    res.status(404);
    throw new Error("Income not found.");
  }
});

const deleteUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (income) {
    await Income.destroy({ where: { incomeId: incomeId } });
    res.status(200).json({
      message: `Income deleted successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Income not found.");
  }
});

module.exports = {
  getUserIncome,
  getAllUserIncomes,
  createUserIncome,
  deleteUserIncome,
  updateUserIncome,
};
