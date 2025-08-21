const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/profile/:id")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUserProfile);

router.delete("/delete-profile", authMiddleware, deleteUserProfile);

module.exports = router;
