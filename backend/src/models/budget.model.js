const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Budget = sequelize.define("Budget", {
  budgetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

Budget.sync();

module.exports = Budget;
