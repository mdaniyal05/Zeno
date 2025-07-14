const express = require("express");
const router = express.Router();
const { generateOtp } = require("../controllers/otp.controller");

router.post("/send-otp", generateOtp);

module.exports = router;
