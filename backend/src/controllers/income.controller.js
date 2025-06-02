const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");

const getUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (income) {
    res.status(200).json({
      incomeId: income.incomeId,
      incomeAmount: income.incomeAmount,
      incomeCurrency: income.incomeCurrency,
      incomeDate: income.incomeDate,
      incomeSource: income.incomeSource,
    });
  } else {
    res.status(404);
    throw new Error("Income Not Found.");
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
    throw new Error("No Incomes Available.");
  }
});

const createUserIncome = asyncHandler(async (req, res) => {});

const deleteUserIncome = asyncHandler(async (req, res) => {
  const incomeId = req.params.id;
  const income = await Income.findByPk(incomeId);

  if (income) {
    await Income.destroy({ where: { incomeId: incomeId } });
    res.status(200).json({
      message: `Income Of Amount: ${income.incomeAmount} Deleted Successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Income Not Found.");
  }
});

module.exports = {
  getUserIncome,
  getAllUserIncomes,
  createUserIncome,
  deleteUserIncome,
};
