const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Category = require("./category.model");
const Budget = require("./budget.model");

const Expense = sequelize.define(
  "Expense",
  {
    expenseId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    expenseAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    expenseType: {
      type: DataTypes.ENUM("Needs", "Wants", "Savings"),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    expenseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    merchant: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Expenses",
    timestamps: true,
    updatedAt: false,
  }
);

User.hasMany(Expense, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Expense.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Category.hasMany(Expense, {
  foreignKey: { name: "categoryId", allowNull: false },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

Expense.belongsTo(Category, {
  foreignKey: { name: "categoryId", allowNull: false },
  as: "fromCategory",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

Budget.hasMany(Expense, {
  foreignKey: { name: "budgetId", allowNull: false },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

Expense.belongsTo(Budget, {
  foreignKey: { name: "budgetId", allowNull: false },
  as: "ofBudget",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

module.exports = Expense;
