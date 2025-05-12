const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Account = sequelize.define("Account", {
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});
