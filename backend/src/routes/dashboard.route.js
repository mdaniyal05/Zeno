const express = require("express");
const router = express.Router();
const getUserDashboardData = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/data", authMiddleware, getUserDashboardData);

module.exports = router;
