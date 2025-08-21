const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findByPk(decoded?.payload.userId, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      if (!user) {
        res.status(401);
        throw new Error("Invalid token.");
      }

      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      throw new Error(error?.message || "Not authorized. Token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized. No token.");
  }
});

module.exports = authMiddleware;
