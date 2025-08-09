const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");
const Category = require("../models/category.model");
const Budget = require("../models/budget.model");

const getUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (expense) {
    res.status(200).json({
      expenseId: expense.expenseId,
      expenseAmount: expense.expenseAmount,
      expenseType: expense.expenseType,
      expenseDate: expense.expenseDate,
      merchant: expense.merchant,
      categoryId: expense.categoryId,
    });
  } else {
    res.status(404);
    throw new Error("Expense not found.");
  }
});

const getAllUserExpenses = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const expenses = await Expense.findAll({ where: { userId: userId } });

  if (expenses) {
    res.status(200).json({
      expensesData: expenses,
    });
  } else {
    res.status(404);
    throw new Error("No expenses available.");
  }
});

const createUserExpense = asyncHandler(async (req, res) => {
  const { expenseAmount, expenseType, expenseDate, merchant, categoryId } =
    req.body;

  const userId = req.user.userId;

  const category = await Category.findByPk(categoryId);

  if (category.categoryType !== expenseType) {
    res.status(400);
    throw new Error("The category type and expense type should be same.");
  }

  if (category && category.isActive === true) {
    if (expenseAmount < 0) {
      res.status(400);
      throw new Error("Negative values are not allowed.");
    }

    category.limitRemainingAmount =
      category.limitRemainingAmount - expenseAmount;

    if (category.limitRemainingAmount <= 0) {
      category.islimitExceeded = true;
      category.isActive === false;
      res.status(400);
      throw new Error(
        "This category's limit is exceeded and is not active. Create a new one or select another."
      );
    }

    await category.save();

    const budget = await Budget.findOne({ where: { status: "Active" } });

    if (budget) {
      if (
        budget.amountSpent > budget.budgetAmount &&
        budget.amountRemaining <= 0
      ) {
        budget.status = "Exceeded";
        res.status(400);
        throw new Error(
          "The budget amount is exceeded and not active anymore. You were not able to reach your budget goal. Try again next time. You have to create a new budget now."
        );
      }

      budget.amountSpent = budget.amountSpent + expenseAmount;

      budget.amountRemaining = budget.amountRemaining - expenseAmount;

      await budget.save();
    }

    const newExpense = await Expense.create({
      expenseAmount: expenseAmount,
      expenseType: expenseType,
      expenseDate: expenseDate,
      merchant: merchant,
      userId: userId,
      categoryId: category.categoryId,
    });

    if (newExpense) {
      res.status(201).json({
        expenseAmount: newExpense.expenseAmount,
        expenseType: newExpense.expenseType,
        expenseDate: newExpense.expenseDate,
        merchant: newExpense.merchant,
        message: "Expense created successfully.",
      });
    } else {
      res.status(400);
      throw new Error("Invalid expense data.");
    }
  } else {
    throw new Error(
      "The category is not active anymore due to exceeded factor. Select another category or create a new one."
    );
  }
});

const updateUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  if (expense) {
    const category = await Category.findByPk(expense.categoryId);

    if (req.body.categoryId !== category.categoryId) {
      if (category.categoryType !== req.body.expenseType) {
        res.status(400);
        throw new Error("The category type and expense type should be same.");
      }

      category.limitRemainingAmount =
        category.limitRemainingAmount + expense.expenseAmount;

      const newCategory = await Category.findByPk(req.body.categoryId);

      newCategory.limitRemainingAmount =
        newCategory.limitRemainingAmount - req.body.expenseAmount;

      if (newCategory.limitRemainingAmount <= 0) {
        newCategory.islimitExceeded = true;
        newCategory.isActive === false;
        await newCategory.save();
        res.status(400);
        throw new Error(
          "This category's limit is exceeded and is not active. Create a new one or select another."
        );
      } else {
        await category.save();
        await newCategory.save();
      }
    }

    const budget = await Budget.findOne({ where: { status: "Active" } });

    if (budget) {
      if (
        budget.amountSpent > budget.budgetAmount &&
        budget.amountRemaining <= 0
      ) {
        budget.status = "Exceeded";
        res.status(400);
        throw new Error(
          "The budget amount is exceeded and not active anymore. You were not able to reach your budget goal. Try again next time. You have to create a new budget now."
        );
      }

      budget.amountSpent = budget.amountSpent - expense.expenseAmount;
      budget.amountSpent = budget.amountSpent + req.body.expenseAmount;

      budget.amountRemaining = budget.amountRemaining + expense.expenseAmount;
      budget.amountRemaining = budget.amountRemaining - req.body.expenseAmount;

      await budget.save();
    }

    expense.expenseAmount = req.body.expenseAmount || expense.expenseAmount;
    expense.expenseType = req.body.expenseType || expense.expenseType;
    expense.expenseDate = req.body.expenseDate || expense.expenseDate;
    expense.merchant = req.body.merchant || expense.merchant;
    expense.categoryId = req.body.categoryId || expense.categoryId;

    const updatedExpense = await expense.save();

    res.status(201).json({
      expenseAmount: updatedExpense.expenseAmount,
      expenseType: updatedExpense.expenseType,
      expenseDate: updatedExpense.expenseDate,
      merchant: updatedExpense.merchant,
      categoryId: updatedExpense.categoryId,
    });
  } else {
    res.status(404);
    throw new Error("Expense not found.");
  }
});

const deleteUserExpense = asyncHandler(async (req, res) => {
  const expenseId = req.params.id;
  const expense = await Expense.findByPk(expenseId);

  const category = await Category.findByPk(expense.categoryId);

  if (expense && category) {
    category.limitRemainingAmount =
      category.limitRemainingAmount + expense.expenseAmount;

    await category.save();

    await Expense.destroy({ where: { expenseId: expenseId } });
    res.status(200).json({
      message: `Expense deleted successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Expense not found.");
  }
});

module.exports = {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
};
