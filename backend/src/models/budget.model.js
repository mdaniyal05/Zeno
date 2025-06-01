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
      validate: {
        min: {
          args: 1,
          msg: "Amount must be greater than 0.",
        },
      },
    },
    budgetPeriod: {
      type: DataTypes.ENUM("Daily", "Weekly", "Monthly", "Yearly"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [0, 150],
          msg: "Description cannot exceed 150 characters.",
        },
      },
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        validator(value) {
          if (value > this.startDate) {
            throw new Error("Start date must be in the past.");
          }
        },
      },
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        validator(value) {
          if (value < this.startDate) {
            throw new Error("End date must be after the start date.");
          }
        },
      },
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
