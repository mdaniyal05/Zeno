const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Expense = sequelize.define(
  "Expense",
  {
    expenseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
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
      type: DataTypes.DATE,
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

module.exports = Expense;
