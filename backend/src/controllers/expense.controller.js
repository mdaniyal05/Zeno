const asyncHandler = require("express-async-handler");
const Expense = require("../models/expense.model");
const Category = require("../models/category.model");

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
    throw new Error("Expense Not Found.");
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
    throw new Error("No Expenses Available.");
  }
});

const createUserExpense = asyncHandler(async (req, res) => {
  const { expenseAmount, expenseType, expenseDate, merchant, categoryId } =
    req.body;

  const userId = req.user.userId;

  const category = await Category.findByPk(categoryId);

  if (category && category.isActive === true) {
    if (expenseAmount < 0) {
      res.status(400);
      throw new Error("Negative values are not allowed.");
    }

    category.monthlyLimitRemainingAmount =
      category.monthlyLimitRemainingAmount - expenseAmount;

    if (category.monthlyLimitRemainingAmount <= 0) {
      category.isMonthlyLimitExceeded = true;
      category.isActive === false;
      res.status(400);
      throw new Error(
        "This category's monthly limit is exceeded and is not active. Create a new one or select another."
      );
    }

    await category.save();

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

    if (
      (req.body.categoryId !== category.categoryId &&
        req.body.expenseAmount !== expense.expenseAmount) ||
      (req.body.categoryId !== category.categoryId &&
        req.body.expenseAmount === expense.expenseAmount)
    ) {
      category.monthlyLimitRemainingAmount =
        category.monthlyLimitRemainingAmount + expense.expenseAmount;

      const newCategory = await Category.findByPk(req.body.categoryId);

      newCategory.monthlyLimitRemainingAmount =
        newCategory.monthlyLimitRemainingAmount - req.body.expenseAmount;

      if (newCategory.monthlyLimitRemainingAmount <= 0) {
        newCategory.isMonthlyLimitExceeded = true;
        newCategory.isActive === false;
        await newCategory.save();
        res.status(400);
        throw new Error(
          "This category's monthly limit is exceeded and is not active. Create a new one or select another."
        );
      } else {
        await category.save();
        await newCategory.save();
      }
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
    category.monthlyLimitRemainingAmount =
      category.monthlyLimitRemainingAmount + expense.expenseAmount;

    await category.save();

    await Expense.destroy({ where: { expenseId: expenseId } });
    res.status(200).json({
      message: `Expense Of Amount: ${expense.expenseAmount} Deleted Successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Expense Not Found.");
  }
});

module.exports = {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
};
