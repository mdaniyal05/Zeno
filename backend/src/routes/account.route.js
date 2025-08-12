const express = require("express");
const router = express.Router();
const {
  getUserAccount,
  getAllUserAccounts,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
} = require("../controllers/account.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllUserAccounts);
router.post("/create-account", authMiddleware, createUserAccount);
router
  .route("/account/:id")
  .get(authMiddleware, getUserAccount)
  .put(authMiddleware, updateUserAccount)
  .delete(authMiddleware, deleteUserAccount);

module.exports = router;
