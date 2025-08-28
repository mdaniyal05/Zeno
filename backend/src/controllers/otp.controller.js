const sequelize = require("../db/db");
const asyncHandler = require("express-async-handler");
const Otp = require("../models/otp.model");
const generateOtp = require("../utils/generateOtp");
const verifyEmail = require("../utils/verificationEmail");

/*

Generate OTP controller

*/

const generateOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Please provide email.");
  }

  const t = await sequelize.transaction();

  try {
    let otp = await Otp.findOne({ where: { email: email }, transaction: t });

    if (!otp) {
      otp = await Otp.create({ email: email }, { transaction: t });
    }

    if (otp.isBlocked) {
      const currentTime = new Date();
      if (currentTime < otp.blockUntil) {
        res.status(403);
        throw new Error("You are blocked. Try after some time.");
      } else {
        otp.isBlocked = false;
        otp.OtpAttempts = 0;
      }
    }

    const lastOtpTime = otp.createdAt;
    const currentTime = new Date();

    if (
      otp.otpAttempts !== 0 &&
      otp.email === email &&
      lastOtpTime &&
      currentTime - lastOtpTime < 60000
    ) {
      res.status(403);
      throw new Error("One minute gap required between OTP requests.");
    }

    const OTP = generateOtp();
    otp.otp = OTP;
    otp.setDataValue("createdAt", new Date(currentTime));

    await otp.save({ transaction: t });

    const verify = verifyEmail(email, OTP);

    if (verify) {
      await t.commit();

      res.status(200).json({
        message: "OTP sent successfully.",
      });
    } else {
      res.status(500);
      throw new Error("Unable to send OTP. Server error.");
    }
  } catch (error) {
    await t.rollback();
    res.status(500);
    throw new Error(error.message);
  }
});

/*

Generate OTP controller (END)

*/

module.exports = generateOTP;
