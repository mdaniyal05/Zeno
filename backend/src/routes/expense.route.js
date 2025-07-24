const express = require("express");
const router = express.Router();
const {
  getUserExpense,
  getAllUserExpenses,
  createUserExpense,
  updateUserExpense,
  deleteUserExpense,
} = require("../controllers/expense.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserExpenses);
router.post("/create-expense", protectRoute, createUserExpense);
router
  .route("/expense/:id")
  .get(protectRoute, getUserExpense)
  .put(protectRoute, updateUserExpense)
  .delete(protectRoute, deleteUserExpense);

module.exports = router;
