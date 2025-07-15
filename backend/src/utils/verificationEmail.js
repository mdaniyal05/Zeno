const mailSender = require("./mailSender");

const verifyEmail = async (email, otp) => {
  const title = "Email Verification";
  const body = `<h1>Please confirm your otp</h1>
                <p>Here is your OTP code: ${otp}</p>`;

  try {
    await mailSender(email, title, body);
  } catch (error) {
    throw new Error(`Error occured while sending email: ${error}`);
  }
};

module.exports = verifyEmail;
