const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Income = sequelize.define(
  "Income",
  {
    incomeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    incomeAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    incomeDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    incomeSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "Incomes", timestamps: true, updatedAt: false }
);

User.hasMany(Income, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
});
Income.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
});

module.exports = Income;
