const express = require("express");
const router = express.Router();
const {
  getUserTransaction,
  getAllUserTransactions,
  createUserTransaction,
  deleteUserTransaction,
} = require("../controllers/transaction.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserTransactions);
router.post("/create-transaction", protectRoute, createUserTransaction);
router
  .route("/transaction/:id")
  .get(protectRoute, getUserTransaction)
  .delete(protectRoute, deleteUserTransaction);

module.exports = router;
