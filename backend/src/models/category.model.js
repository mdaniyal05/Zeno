const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Category = sequelize.define(
  "Category",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryType: {
      type: DataTypes.ENUM("Expense", "Income"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    monthlyLimit: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    tableName: "Categories",
    timestamps: true,
  }
);

module.exports = Category;
