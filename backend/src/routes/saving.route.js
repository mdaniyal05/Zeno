const express = require("express");
const router = express.Router();
const {
  getUserSaving,
  getAllUserSavings,
  createUserSaving,
  updateUserSaving,
  deleteUserSaving,
} = require("../controllers/saving.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserSavings);
router.post("/create-saving", protectRoute, createUserSaving);
router
  .route("/saving/:id")
  .get(protectRoute, getUserSaving)
  .put(protectRoute, updateUserSaving)
  .delete(protectRoute, deleteUserSaving);

module.exports = router;
