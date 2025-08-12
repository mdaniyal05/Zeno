const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protectRoute = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findByPk(decoded?.userId, {
        attributes: { exclude: ["password", "refreshToken"] },
      });

      if (!user) {
        res.status(401);
        throw new Error("Invalid token.");
      }

      req.user = user;

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized. Token Failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized. No Token.");
  }
});

module.exports = protectRoute;
