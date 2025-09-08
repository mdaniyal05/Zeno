const fs = require("fs");
const path = require("path");
const mailSender = require("./mailSender");

const verifyEmail = (email, otp) => {
  const templatePath = path.join(__dirname, "../html", "otpVerification.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  const title = "Email Verification";
  html = html.replace("{{OTP}}", otp);

  try {
    mailSender(email, title, html);
    return true;
  } catch (error) {
    throw new Error(`Error occured while sending email: ${error}`);
  }
};

module.exports = verifyEmail;
