const { Sequelize } = require("sequelize");
const asyncHandler = require("express-async-handler");
const Income = require("../models/income.model");
const Expense = require("../models/expense.model");
const Transaction = require("../models/transaction.model");
const Budget = require("../models/budget.model");

const months = [
  { month: "Jan" },
  { month: "Feb" },
  { month: "Mar" },
  { month: "Apr" },
  { month: "May" },
  { month: "Jun" },
  { month: "Jul" },
  { month: "Aug" },
  { month: "Sep" },
  { month: "Oct" },
  { month: "Nov" },
  { month: "Dec" },
];

const monthlyIncomeExpenseSaving = (
  monthlyIncomeData,
  monthlyExpenseData,
  monthlySavingData
) => {
  return months.map((month) => {
    const income =
      monthlyIncomeData.find((income) => income.month === month.month) || {};
    const expense =
      monthlyExpenseData.find((expense) => expense.month === month.month) || {};
    const saving =
      monthlySavingData.find((saving) => saving.month === month.month) || {};

    return {
      month: month.month,
      totalIncome: income.totalIncome || 0,
      totalExpense: expense.totalExpense || 0,
      totalSaving: saving.totalSaving || 0,
    };
  });
};

const totalIncomeExpenseSaving = (
  totalIncomeData,
  totalExpenseData,
  totalSavingData
) => {
  if (
    totalIncomeData.length === 0 ||
    totalExpenseData.length === 0 ||
    totalSavingData.length === 0
  ) {
    const allTotal =
      totalIncomeData[0].allIncome +
      totalExpenseData[0].allExpense +
      totalSavingData[0].allSaving;

    const colors = [
      "hsl(220, 25%, 65%)",
      "hsl(220, 25%, 45%)",
      "hsl(220, 25%, 30%)",
    ];

    return [
      ...totalIncomeData.map((obj, idx) => ({
        id: idx,
        value: obj.allIncome || 0,
        label: "Total income",
        color: colors[idx],
        percentage: ((obj.allIncome / allTotal) * 100).toFixed(2) || 0,
      })),
      ...totalExpenseData.map((obj, idx) => ({
        id: totalIncomeData.length + idx,
        value: obj.allExpense || 0,
        label: "Total expense",
        color: colors[totalIncomeData.length + idx],
        percentage: ((obj.allExpense / allTotal) * 100).toFixed(2) || 0,
      })),
      ...totalSavingData.map((obj, idx) => ({
        id: totalIncomeData.length + totalExpenseData.length + idx,
        value: obj.allSaving || 0,
        label: "Total saving",
        color: colors[totalIncomeData.length + totalExpenseData.length + idx],
        percentage: ((obj.allSaving / allTotal) * 100).toFixed(2) || 0,
      })),
    ];
  }
  return [];
};

const activeBudget = (currentBudget) => {
  if (currentBudget) {
    const keysToExtract = ["budgetAmount", "amountSpent", "amountRemaining"];
    const colors = [
      "hsl(220, 25%, 65%)",
      "hsl(220, 25%, 45%)",
      "hsl(220, 25%, 30%)",
    ];

    const labelMap = {
      budgetAmount: "Budget amount",
      amountRemaining: "Amount remaining",
      amountSpent: "Amount spent",
    };

    const dataset = keysToExtract.map((key, idx) => ({
      index: idx,
      value: currentBudget[`${key}`] || 0,
      label: labelMap[`${key}`],
      percentage:
        ((currentBudget[`${key}`] / currentBudget.budgetAmount) * 100).toFixed(
          2
        ) || 0,
      color: colors[idx],
    }));

    return dataset;
  } else {
    return [];
  }
};

const monthlyIncomeCalculation = (monthlyIncome) =>
  months.map((month) => {
    const income =
      monthlyIncome.find((income) => income.month === month.month) || {};
    return { month: month.month, totalIncome: income.totalIncome || 0 };
  });

const monthlyExpenseCalculation = (monthlyExpense) =>
  months.map((month) => {
    const expense =
      monthlyExpense.find((expense) => expense.month === month.month) || {};
    return { month: month.month, totalExpense: expense.totalExpense || 0 };
  });

const monthlySavingCalculation = (monthlySaving) =>
  months.map((month) => {
    const saving =
      monthlySaving.find((saving) => saving.month === month.month) || {};
    return { month: month.month, totalSaving: saving.totalSaving || 0 };
  });

const getUserDashboardData = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const monthlyIncome = await Income.findAll({
    attributes: [
      [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "MMM"), "month"],
      [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "totalIncome"],
    ],
    where: { userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("incomeDate"), "MMM")],
    raw: true,
  });

  const monthlyExpense = await Expense.findAll({
    attributes: [
      [Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "MMM"), "month"],
      [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "totalExpense"],
    ],
    where: { userId },
    group: [Sequelize.fn("FORMAT", Sequelize.col("expenseDate"), "MMM")],
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
    where: { userId, transactiontype: "Saving" },
    group: [Sequelize.fn("FORMAT", Sequelize.col("transactionDate"), "MMM")],
    raw: true,
  });

  const totalIncome = await Income.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("incomeAmount")), "allIncome"],
    ],
    where: { userId },
    raw: true,
  });

  const totalExpense = await Expense.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("expenseAmount")), "allExpense"],
    ],
    where: { userId },
    raw: true,
  });

  const totalSaving = await Transaction.findAll({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("transactionAmount")), "allSaving"],
    ],
    where: { userId, transactiontype: "Saving" },
    raw: true,
  });

  const currentBudget = await Budget.findOne({
    where: { status: "Active", userId },
    raw: true,
  });

  const allIncome = Number(totalIncome[0]?.allIncome || 0);
  const allExpense = Number(totalExpense[0]?.allExpense || 0);
  const allSaving = Number(totalSaving[0]?.allSaving || 0);

  const netBalance = allIncome - allExpense;
  const savingsRate = allIncome > 0 ? (allSaving / allIncome) * 100 : 0;
  let budgetUtilization = 0;

  if (currentBudget && currentBudget.budgetAmount > 0) {
    budgetUtilization =
      (currentBudget.amountSpent / currentBudget.budgetAmount) * 100;
  }

  const insights = [];

  if (netBalance < 0) {
    insights.push(
      "⚠️ You are spending more than you earn. Consider cutting expenses."
    );
  } else {
    insights.push("✅ You are saving money. Great job!");
  }

  if (savingsRate < 20) {
    insights.push("💡 Try to increase your savings rate to at least 20%.");
  }

  const monthlyIncomeDataset = monthlyIncomeCalculation(monthlyIncome);
  const monthlyExpenseDataset = monthlyExpenseCalculation(monthlyExpense);
  const monthlySavingDataset = monthlySavingCalculation(monthlySaving);

  const IncomeExpenseSavingDataset = monthlyIncomeExpenseSaving(
    monthlyIncome,
    monthlyExpense,
    monthlySaving
  );

  const totalIncomeExpenseSavingDataset = totalIncomeExpenseSaving(
    totalIncome,
    totalExpense,
    totalSaving
  );

  const activeBudgetDataset = activeBudget(currentBudget);

  res.status(200).json({
    IncomeExpenseSavingDataset,
    totalIncomeExpenseSavingDataset,
    activeBudgetDataset,
    monthlyIncomeDataset,
    monthlyExpenseDataset,
    monthlySavingDataset,
    netBalance,
    savingsRate,
    budgetUtilization,
    insights,
  });
});

module.exports = getUserDashboardData;
