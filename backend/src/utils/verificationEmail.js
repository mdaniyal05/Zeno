const mailSender = require("./mailSender");

const verifyEmail = async (email, otp) => {
  const title = "Email Verification";
  const body = `<h1>Please confirm your otp</h1>
                <p>Here is your OTP code: ${otp}</p>`;

  try {
    const mailResponse = await mailSender(email, title, body);
    console.log(`Email sent successfully: ${mailResponse}`);
  } catch (error) {
    console.error(`Error occured while sending email: ${error}`);
    throw error;
  }
};

module.exports = verifyEmail;
