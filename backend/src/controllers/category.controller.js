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

  let categoryNames = [];
  let categoryTypes = [];

  categories.map((categories) => {
    categoryNames.push(categories.dataValues.categoryName);
    categoryTypes.push(categories.dataValues.categoryType);
  });

  if (categories) {
    res.status(200).json({
      categoryNames: categoryNames,
      categoryTypes: categoryTypes,
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
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    category.categoryName = req.body.categoryName || category.categoryName;
    category.categoryType = req.body.categoryType || category.categoryType;
    category.description = req.body.description || category.description;
    category.monthlyLimit = req.body.monthlyLimit || category.monthlyLimit;

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

const deleteCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (category) {
    await Category.destroy({ where: { categoryId: categoryId } });
  } else {
    res.status(404);
    throw new Error("Category Not Found.");
  }
});

module.exports = {
  getcategory,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
