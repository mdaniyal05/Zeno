const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
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
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      get() {
        const rawDate = this.getDataValue("dateOfBirth");
        if (!rawDate) return null;

        const date = new Date(rawDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      },
      set(value) {
        if (!value) {
          this.setDataValue("dateOfBirth", null);
          return;
        }
        const [day, month, year] = value.split("-");
        const formattedDate = `${year}-${month}-${day}`;
        this.setDataValue("dateOfBirth", formattedDate);
      },
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

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
});

module.exports = User;
