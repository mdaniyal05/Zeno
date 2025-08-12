const express = require("express");
const router = express.Router();
const {
  getUserSaving,
  getAllUserSavings,
  createUserSaving,
  updateUserSaving,
  deleteUserSaving,
} = require("../controllers/saving.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllUserSavings);
router.post("/create-saving", authMiddleware, createUserSaving);
router
  .route("/saving/:id")
  .get(authMiddleware, getUserSaving)
  .put(authMiddleware, updateUserSaving)
  .delete(authMiddleware, deleteUserSaving);

module.exports = router;
