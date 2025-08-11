const { Sequelize } = require("sequelize");
const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");
const Expense = require("../models/expense.model");
const Transaction = require("../models/transaction.model");

const totalIncomeExpenseSavingPieChartDataset = (
  totalIncomeData,
  totalExpenseData,
  totalSavingData
) => {
  const combined = [
    ...totalIncomeData.map((obj, idx) => ({
      id: idx + 1,
      value: obj.allIncome,
      label: "Total income",
    })),
    ...totalExpenseData.map((obj, idx) => ({
      id: totalIncomeData.length + idx + 1,
      value: obj.allExpense,
      label: "Total expense",
    })),
    ...totalSavingData.map((obj, idx) => ({
      id: totalIncomeData.length + totalExpenseData.length + idx + 1,
      value: obj.allSaving,
      label: "Total saving",
    })),
  ];

  return combined;
};

const getUserDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const monthlyIncome = await Income.findAll({
    attributes: [
      [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "MMM"), "month"],
      [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "totalIncome"],
    ],
    where: { userId: userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "MMM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const totalIncome = await Income.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "allIncome"],
    ],
    where: { userId: userId },
    raw: true,
  });

  const monthlyExpense = await Expense.findAll({
    attributes: [
      [Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "MMM"), "month"],
      [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "totalExpense"],
    ],
    where: { userId: userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "MMM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const totalExpense = await Expense.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "allExpense"],
    ],
    where: { userId: userId },
    raw: true,
  });

  const monthlySaving = await Transaction.findAll({
    attributes: [
      [
        Sequelize.fn("FORMAT", Sequelize.col("transactionDate"), "MMM"),
        "month",
      ],
      [Sequelize.fn("SUM", Sequelize.col("transactionAmount")), "totalSaving"],
    ],
    where: { userId: userId, transactiontype: "Saving" },
    group: [Sequelize.fn("FORMAT", Sequelize.col("transactionDate"), "MMM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const totalSaving = await Transaction.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("transactionAmount")), "allSaving"],
    ],
    where: { userId: userId, transactiontype: "Saving" },
    raw: true,
  });

  const monthlyTransaction = await Transaction.findAll({
    attributes: [
      [
        Sequelize.fn("FORMAT", Sequelize.col("transactionDate"), "MMM"),
        "month",
      ],
      [
        Sequelize.fn("SUM", Sequelize.col("transactionAmount")),
        "totalTransaction",
      ],
    ],
    where: { userId: userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("transactionDate"), "MMM")],
    order: [[Sequelize.literal("month"), "ASC"]],
    raw: true,
  });

  const pieChartData = totalIncomeExpenseSavingPieChartDataset(
    totalIncome,
    totalExpense,
    totalSaving
  );

  if (
    !monthlyIncome ||
    !monthlyExpense ||
    !monthlySaving ||
    !monthlyTransaction ||
    !totalIncome ||
    !totalExpense ||
    !totalSaving
  ) {
    res.status(400);
    throw new Error("Unable to get dashboard data. Something went wrong");
  }

  res.status(200).json({
    monthlyIncomeData: monthlyIncome,
    monthlyExpenseData: monthlyExpense,
    monthlySavingData: monthlySaving,
    monthlyTransactionData: monthlyTransaction,
    pieChartData: pieChartData,
  });
});

module.exports = getUserDashboardData;
