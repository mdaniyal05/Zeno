const express = require("express");
const router = express.Router();
const {
  getUserIncome,
  getAllUserIncomes,
  createUserIncome,
  updateUserIncome,
  deleteUserIncome,
} = require("../controllers/income.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllUserIncomes);
router.post("/create-income", authMiddleware, createUserIncome);
router
  .route("/income/:id")
  .get(authMiddleware, getUserIncome)
  .put(authMiddleware, updateUserIncome)
  .delete(authMiddleware, deleteUserIncome);

module.exports = router;
