const express = require("express");
const router = express.Router();
const {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
} = require("../controllers/expense.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllUserExpenses);
router.post("/create-expense", authMiddleware, createUserExpense);
router
  .route("/expense/:id")
  .get(authMiddleware, getUserExpense)
  .put(authMiddleware, updateUserExpense)
  .delete(authMiddleware, deleteUserExpense);

module.exports = router;
