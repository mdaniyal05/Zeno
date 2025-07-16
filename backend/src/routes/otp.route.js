const express = require("express");
const router = express.Router();
const generateOTP = require("../controllers/otp.controller");

router.post("/send-otp", generateOTP);

module.exports = router;
