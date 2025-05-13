const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Category = require("./category.model");

const Budget = sequelize.define(
  "Budget",
  {
    budgetId: {
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
    category: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "categoryId",
      },
    },
    budgetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budgetAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    budgetPeriod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amountSpent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amountRemaining: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percentUsed: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed", "Exceeded"),
      allowNull: false,
    },
    notificationsEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "Budgets",
    timestamps: true,
  }
);

Budget.sync();

module.exports = Budget;
