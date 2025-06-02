const express = require("express");
const router = express.Router();
const {
  getUserIncome,
  getAllUserIncomes,
  createUserIncome,
  deleteUserIncome,
} = require("../controllers/income.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserIncomes);
router.post("/create-income", protectRoute, createUserIncome);
router
  .route("/income/:id")
  .get(protectRoute, getUserIncome)
  .delete(protectRoute, deleteUserIncome);

module.exports = router;
