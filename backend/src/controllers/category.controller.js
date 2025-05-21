const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");

const getcategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    res.status(200).json({
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

const getAllCategories = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const categories = await Category.findAll({ where: { userId: userId } });

  if (categories) {
    res.status(200).json({
      categoryName: categories.categoryName,
      categoryType: categories.categoryType,
    });
  } else {
    res.status(404);
    throw new Error("No Categories Available.");
  }
});

const createCategory = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Category Created",
  });
});

const updateCategory = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Category Updated",
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Category Deleted",
  });
});

module.exports = {
  getcategory,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
