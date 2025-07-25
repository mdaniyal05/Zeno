const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");

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
      monthlyLimit: category.monthlyLimit,
    });
  } else {
    res.status(404);
    throw new Error("Category Not Found.");
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
    throw new Error("No Categories Available.");
  }
});

const createUserCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryType, description, monthlyLimit } = req.body;

  const userId = req.user.userId;
  const isActive = true;

  if (monthlyLimit < 0) {
    res.status(400);
    throw new Error("Negative values are not allowed.");
  }

  const newCategory = await Category.create({
    categoryName: categoryName,
    categoryType: categoryType,
    description: description,
    isActive: isActive,
    monthlyLimit: monthlyLimit,
    monthlyLimitRemainingAmount: monthlyLimit,
    isMonthlyLimitExceeded: false,
    userId: userId,
  });

  if (newCategory) {
    res.status(201).json({
      categoryName: categoryName,
      categoryType: categoryType,
      description: description,
      isActive: isActive,
      monthlyLimit: monthlyLimit,
      message: "Category Created Succesfully.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid Category Data.");
  }
});

const updateUserCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    category.categoryName = req.body.categoryName || category.categoryName;
    category.categoryType = req.body.categoryType || category.categoryType;
    category.description = req.body.description || category.description;
    category.monthlyLimit = req.body.monthlyLimit || category.monthlyLimit;

    if (req.body.monthlyLimit < 0) {
      res.status(400);
      throw new Error("Negative values are not allowed.");
    }

    const updatedCategory = await category.save();

    res.status(200).json({
      categoryName: updatedCategory.categoryName,
      categoryType: updatedCategory.categoryType,
      description: updatedCategory.description,
      monthlyLimit: updatedCategory.monthlyLimit,
    });
  } else {
    res.status(404);
    throw new Error("Category Not Found.");
  }
});

const deleteUserCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    await Category.destroy({ where: { categoryId: categoryId } });
    res.status(200).json({
      message: `Category ${category.categoryName} Deleted Successfully.`,
    });
  } else {
    res.status(404);
    throw new Error("Category Not Found.");
  }
});

module.exports = {
  getUsercategory,
  getAllUserCategories,
  createUserCategory,
  updateUserCategory,
  deleteUserCategory,
};
