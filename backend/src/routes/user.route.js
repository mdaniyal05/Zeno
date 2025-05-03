const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");

router.route("/profile/:id").get(getUserProfile).put(updateUserProfile);

module.exports = router;
