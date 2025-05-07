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
      defaultValue: 1,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 150],
          msg: "About section cannot exceed 150 characters.",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        msg: "Phone number must be unique.",
      },
      validate: {
        len: {
          args: [10, 11],
          msg: "Phone number must be 10 or 11 digits.",
        },
      },
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 16],
          msg: "Password must be between 8 and 16 characters",
        },
      },
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

module.exports = User;
