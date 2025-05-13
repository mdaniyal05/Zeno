const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const User = require("./user.model");

const Transaction = sequelize.define("Transaction", {
  transactionId: {
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
});
