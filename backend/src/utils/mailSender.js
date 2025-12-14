const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

const mailSender = async (email, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"Zeno" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: html,
      text: text,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = mailSender;
