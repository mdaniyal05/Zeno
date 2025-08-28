const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const Category = require("../models/category.model");
const Expense = require("../models/expense.model");

/*

Get single category controller

*/

const getUsercategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  res.status(200).json({
    ...category.toJSON(),
  });
});

/*

Get single category controller (END)

*/

/*

Get all category controller

*/

const getAllUserCategories = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const categories = await Category.findAll({ where: { userId: userId } });

  if (!categories) {
    res.status(404);
    throw new Error("No categories found.");
  }

  res.status(200).json({
    categoriesData: categories,
  });
});

/*

Get all category controller (END)

*/

/*

Create category controller

*/

const createUserCategory = asyncHandler(async (req, res) => {
  const { categoryName, categoryType, description, limit } = req.body;

  if (!categoryName || !categoryType || !description || !limit) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  if (limit <= 0) {
    res.status(400);
    throw new Error("Limit must be greater than 0.");
  }

  const userId = req.user.userId;

  const t = await sequelize.transaction();

  try {
    const newCategory = await Category.create(
      {
        categoryName: categoryName,
        categoryType: categoryType,
        description: description,
        limit: limit,
        limitRemainingAmount: limit,
        userId: userId,
      },
      { transaction: t }
    );

    if (newCategory) {
      await t.commit();

      res.status(201).json({
        ...newCategory.toJSON(),
        message: "Category created succesfully.",
      });
    }
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Create category controller (END)

*/

/*

Update category controller

*/

const updateUserCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  if (req.body.limit <= 0) {
    res.status(400);
    throw new Error("Limit must be greater than 0.");
  }

  if (req.body.limit !== category.limit) {
    category.limitRemainingAmount =
      req.body.limit - (category.limit - category.limitRemainingAmount);
  }

  const t = await sequelize.transaction();

  try {
    Object.assign(category, {
      categoryName: req.body.categoryName,
      categoryType: req.body.categoryType,
      description: req.body.description,
      limit: req.body.limit,
    });

    await category.save({ transaction: t });

    await t.commit();

    res.status(200).json({
      ...category.toJSON(),
      message: "Category updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Update category controller (END)

*/

/*

Delete category controller

*/

const deleteUserCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);

  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  const t = await sequelize.transaction();

  try {
    await Expense.destroy({
      where: { categoryId: categoryId },
      transaction: t,
    });

    await category.destroy({ transaction: t });

    await t.commit();

    res.status(200).json({
      message: `Category and all expenses related to this category are deleted Successfully.`,
    });
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Delete category controller (END)

*/

module.exports = {
  getUsercategory,
  getAllUserCategories,
  createUserCategory,
  updateUserCategory,
  deleteUserCategory,
};
