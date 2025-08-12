const express = require("express");
const router = express.Router();
const {
  getUserBudget,
  getAllUserBudgets,
  createUserBudget,
  updateUserBudget,
  deleteUserBudget,
} = require("../controllers/budget.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllUserBudgets);
router.post("/create-budget", authMiddleware, createUserBudget);
router
  .route("/budget/:id")
  .get(authMiddleware, getUserBudget)
  .put(authMiddleware, updateUserBudget)
  .delete(authMiddleware, deleteUserBudget);

module.exports = router;
