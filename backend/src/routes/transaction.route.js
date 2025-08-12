const express = require("express");
const router = express.Router();
const {
  getUserTransaction,
  getAllUserTransactions,
  createUserTransaction,
  updateUserTransaction,
  deleteUserTransaction,
} = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, getAllUserTransactions);
router.post("/create-transaction", authMiddleware, createUserTransaction);
router
  .route("/transaction/:id")
  .get(authMiddleware, getUserTransaction)
  .put(authMiddleware, updateUserTransaction)
  .delete(authMiddleware, deleteUserTransaction);

module.exports = router;
