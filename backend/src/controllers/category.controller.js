const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");
const Expense = require("../models/expense.model");

const getUsercategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    res.status(200).json({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      categoryType: category.categoryType,
      description: category.description,
      isActive: category.isActive,
      limit: category.limit,
      limitRemainingAmount: category.limitRemainingAmount,
      islimitExceeded: category.islimitExceeded,
    });
  } else {
    res.status(404);
    throw new Error("Category not found.");
  }
});

const getAllUserCategories = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const categories = await Category.findAll({ where: { userId: userId } });

  if (categories) {
    res.status(200).json({
      categoriesData: categories,
    });
  } else {
    res.status(404);
    throw new Error("No categories available.");
  }
});

const createUserCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryType, description, limit } = req.body;

  if (!categoryName || !categoryType || !description || !limit) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (limit <= 0) {
    res.status(400);
    throw new Error("Negative values and zero are not allowed.");
  }

  const userId = req.user.userId;

  const newCategory = await Category.create({
    categoryName: categoryName,
    categoryType: categoryType,
    description: description,
    limit: limit,
    limitRemainingAmount: limit,
    userId: userId,
  });

  if (newCategory) {
    res.status(201).json({
      message: "Category created succesfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid category data.");
  }
});

const updateUserCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    if (req.body.limit <= 0) {
      res.status(400);
      throw new Error("Negative values and zero are not allowed.");
    }

    if (req.body.limit !== category.limit) {
      const spentAmount = category.limit - category.limitRemainingAmount;

      category.limitRemainingAmount = req.body.limit - spentAmount;
    }

    category.categoryName = req.body.categoryName || category.categoryName;
    category.categoryType = req.body.categoryType || category.categoryType;
    category.description = req.body.description || category.description;
    category.limit = req.body.limit || category.limit;

    const updatedCategory = await category.save();

    res.status(200).json({
      categoryName: updatedCategory.categoryName,
      categoryType: updatedCategory.categoryType,
      description: updatedCategory.description,
      limit: updatedCategory.limit,
      message: "Category updated successfully.",
    });
  } else {
    res.status(404);
    throw new Error("Category not found.");
  }
});

const deleteUserCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    await Expense.destroy({ where: { categoryId: categoryId } });
    await Category.destroy({ where: { categoryId: categoryId } });
    res.status(200).json({
      message: `This category and expenses related to this category are deleted Successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Category not found.");
  }
});

module.exports = {
  getUsercategory,
  getAllUserCategories,
  createUserCategory,
  updateUserCategory,
  deleteUserCategory,
};
