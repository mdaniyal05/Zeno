const otpGenerator = require("otp-generator");

const generateOtp = () => {
  let otp = otpGenerator.generate(6, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

module.exports = generateOtp;
