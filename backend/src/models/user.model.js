const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(11),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isLowercase: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 16],
      },
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);
