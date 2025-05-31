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
    },
    amountRemaining: {
      type: DataTypes.DECIMAL(10, 2),
    },
    percentUsed: {
      type: DataTypes.DECIMAL(5, 2),
      validate: {
        min: 0,
        max: 100,
      },
    },
    status: {
      type: DataTypes.ENUM("Active", "Completed", "Exceeded"),
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

User.hasMany(Budget, {
  foreignKey: { name: "userId", allowNull: false },
});
Budget.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
});

Category.hasOne(Budget, {
  foreignKey: { name: "categoryId", allowNull: false },
});
Budget.belongsTo(Category, {
  as: "ofCategory",
  foreignKey: { name: "categoryId" },
});

module.exports = Budget;
