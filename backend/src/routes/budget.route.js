const express = require("express");
const router = express.Router();
const {
  getBudget,
  getAllBudgets,
  createBudget,
  deleteBudget,
} = require("../controllers/budget.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllBudgets);
router.post("/create-budget", protectRoute, createBudget);
router
  .route("/budget/:id")
  .get(protectRoute, getBudget)
  .delete(protectRoute, deleteBudget);

module.exports = router;
