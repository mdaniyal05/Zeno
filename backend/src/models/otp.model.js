const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const Otp = sequelize.define(
  "Otp",
  {
    otpId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email is already in use.",
      },
      validate: {
        isEmail: {
          msg: "Please enter a valid email address.",
        },
        isLowercase: {
          msg: "Email must be in lowercase.",
        },
      },
    },
    otp: {
      type: DataTypes.STRING,
    },
    otpAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    blockUntil: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: true, updatedAt: false }
);

module.exports = Otp;
