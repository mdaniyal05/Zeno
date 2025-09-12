const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
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
    },
    refreshToken: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Users",
    timestamps: true,
  }
);

User.beforeSave(async (user, options) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
});

module.exports = User;
