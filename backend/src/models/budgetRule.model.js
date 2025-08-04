const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");
const Budget = require("./budget.model");

const BudgetRule = sequelize.define(
  "BudgetRule",
  {
    budgetRuleId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    needsPercentage: {
      type: DataTypes.FLOAT,
      defaultValue: 50.0,
    },
    wantsPercentage: {
      type: DataTypes.FLOAT,
      defaultValue: 30.0,
    },
    savingsPercentage: {
      type: DataTypes.FLOAT,
      defaultValue: 20.0,
    },
  },
  {
    tableName: "BudgetRules",
    timestamps: true,
    updatedAt: false,
  }
);

User.hasMany(BudgetRule, {
  foreignKey: { name: "userId", allowNull: false },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
BudgetRule.belongsTo(User, {
  as: "owner",
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Budget.hasOne(BudgetRule, {
  foreignKey: { name: "budgetId", allowNull: false },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
BudgetRule.belongsTo(Budget, {
  as: "ofBudget",
  foreignKey: { name: "budgetId" },
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

module.exports = BudgetRule;
