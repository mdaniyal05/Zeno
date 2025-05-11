const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const protectRoute = require("../middlewares/protectRoute");

router
  .route("/profile/:id")
  .get(protectRoute, getUserProfile)
  .put(protectRoute, updateUserProfile);

module.exports = router;
