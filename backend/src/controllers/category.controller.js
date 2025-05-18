const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");

const getcategory = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Category",
  });
});

const getAllCategories = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "All Categories",
  });
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
