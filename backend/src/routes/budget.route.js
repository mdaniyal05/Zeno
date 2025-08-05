const express = require("express");
const router = express.Router();
const {
  getUserBudget,
  getAllUserBudgets,
  createUserBudget,
  updateUserBudget,
  deleteUserBudget,
} = require("../controllers/budget.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserBudgets);
router.post("/create-budget", protectRoute, createUserBudget);
router
  .route("/budget/:id")
  .get(protectRoute, getUserBudget)
  .put(protectRoute, updateUserBudget)
  .delete(protectRoute, deleteUserBudget);

module.exports = router;
