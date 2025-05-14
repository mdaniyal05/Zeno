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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "categoryId",
      },
      allowNull: false,
    },
    budgetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budgetAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    budgetPeriod: {
      type: DataTypes.ENUM("Daily", "Weekly", "Monthly", "Quarterly", "Yearly"),
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
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    amountRemaining: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    percentUsed: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
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

Budget.belongsTo(User, { foreignKey: "userId" });
Budget.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Budget;
