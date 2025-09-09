const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailSender = async (email, subject, text, html) => {
  try {
    const message = {
      to: email,
      from: process.env.MAIL_SENDER,
      subject: subject,
      text: text,
      html: html,
    };

    await sgMail.send(message);

    console.log("Email sent");
  } catch (error) {
    console.error("Unable to send email: ", error);
  }
};

module.exports = mailSender;
