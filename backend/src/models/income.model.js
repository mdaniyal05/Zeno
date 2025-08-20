const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Income = sequelize.define(
  "Income",
  {
    incomeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    incomeAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    incomeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    incomeSource: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "Incomes", timestamps: true }
);

User.hasMany(Income, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Income.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Income;
