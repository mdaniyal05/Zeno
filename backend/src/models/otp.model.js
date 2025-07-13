const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Otp = sequelize.define(
  "Otp",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresIn: {
      type: DataTypes.DATE,
      defaultValue: () => new Date(Date.now() + 5 * 60 * 1000),
    },
  },
  { timestamps: true, updatedAt: false }
);

module.exports = Otp;
