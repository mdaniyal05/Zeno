const express = require("express");
const router = express.Router();
const getUserDashboardData = require("../controllers/dashboard.controller");
const protectRoute = require("../middlewares/protectRoute");

router.get("/data", protectRoute, getUserDashboardData);

module.exports = router;
