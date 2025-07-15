const asyncHandler = require("express-async-handler");
const Otp = require("../models/otp.model");
const generateOtp = require("../utils/generateOtp");
const verifyEmail = require("../utils/verificationEmail");

const generateOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  let otp = await Otp.findOne({ where: { email: email } });

  if (!otp) {
    otp = await Otp.create({ email: email });
  }

  if (otp.isBlocked) {
    const currentTime = new Date();
    if (currentTime < otp.blockUntil) {
      res.status(403);
      throw new Error("You Are Blocked. Try After Some Time.");
    } else {
      otp.isBlocked = false;
      otp.OtpAttempts = 0;
    }
  }

  const lastOtpTime = otp.createdAt;
  const currentTime = new Date();

  if (lastOtpTime && currentTime - lastOtpTime < 60000) {
    res.status(403);
    throw new Error("One Minute Gap Required Between OTP Requests.");
  }

  const OTP = generateOtp();
  otp.otp = OTP;
  otp.createdAt = currentTime;

  await otp.save();

  const verify = verifyEmail(email, OTP);

  if (verify) {
    res.status(200).json({
      message: "OTP Sent Successfully.",
    });
  } else {
    res.status(500);
    throw new Error("Serverr Error.");
  }
});

module.exports = generateOtp;
