const fs = require("fs");
const path = require("path");
const mailSender = require("./mailSender");

const verifyEmail = async (email, subject, text) => {
  const templatePath = path.join(__dirname, "../html", "otpVerification.html");

  let html = fs.readFileSync(templatePath, "utf-8");
  html = html.replace("{{OTP}}", text);

  try {
    await mailSender(email, subject, text, html);
  } catch (error) {
    console.error(error);
  }
};

module.exports = verifyEmail;
