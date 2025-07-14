const otpGenerator = require("otp-generator");
const asyncHandler = require("express-async-handler");
const Otp = require("../models/otp.model");
const User = require("../models/user.model");

const generateOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const userExists = await User.findOne({ where: { email: email } });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists.");
  }

  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  let result = await Otp.findOne({ where: { otp: otp } });

  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    result = await Otp.findOne({ where: { otp: otp } });
  }

  const newOtp = await Otp.create({
    email: email,
    otp: otp,
  });

  if (newOtp) {
    res.status(201).json({
      otp: newOtp.otp,
      message: "OTP Sent Successfully.",
    });
  } else {
    res.status(500);
    throw new Error("Something Went Wrong.");
  }
});

module.exports = generateOtp;
