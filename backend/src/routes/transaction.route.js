const express = require("express");
const router = express.Router();
const {
  getTransaction,
  getAllTransactions,
  createTransaction,
} = require("../controllers/transaction.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllTransactions);
router.get("/transaction/:id", protectRoute, getTransaction);
router.post("/create-transaction", protectRoute, createTransaction);

module.exports = router;
