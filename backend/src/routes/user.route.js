const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/profile/:id")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

module.exports = router;
