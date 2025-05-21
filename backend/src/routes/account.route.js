const express = require("express");
const router = express.Router();
const {
  getUserAccount,
  getAllUserAccounts,
  createUserAccount,
  deleteUserAccount,
} = require("../controllers/account.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/", protectRoute, getAllUserAccounts);
router.post("/create-account", protectRoute, createUserAccount);
router
  .route("/account/:id")
  .get(protectRoute, getUserAccount)
  .delete(protectRoute, deleteUserAccount);

module.exports = router;
