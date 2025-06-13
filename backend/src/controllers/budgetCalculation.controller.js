const asyncHandler = require("express-async-handler");

const calculateBudget = asyncHandler(async (budget) => {
  if (expenseType === "Needs" || expenseType === "Wants") {
    budget.amountSpent = budget.amountSpent + expenseAmount;
    budget.amountRemaining = budget.amountRemaining - expenseAmount;
    budget.percentUsed = (budget.amountRemaining / budget.budgetAmount) * 100;

    let currentDate = new Date();

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    if (budget.endDate < `${year}-${month}-${day}`) {
      budget.status = "Completed";
    }

    if (budget.amountSpent > budget.budgetAmount) {
      budget.status = "Exceeded";
    }
  }
});

module.exports = calculateBudget;
