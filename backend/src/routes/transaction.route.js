const express = require("express");
const router = express.Router();
const {
  getUserTransaction,
  getAllUserTransactions,
  createUserTransaction,
} = require("../controllers/transaction.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserTransactions);
router.get("/transaction/:id", protectRoute, getUserTransaction);
router.post("/create-transaction", protectRoute, createUserTransaction);

module.exports = router;
