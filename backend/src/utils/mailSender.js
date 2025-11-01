const dotenv = require("dotenv");

dotenv.config();

const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const mailSender = async (email, subject, text, html) => {
  try {
    const sentFrom = new Sender(
      `${process.env.MAIL_SENDER}`,
      "Zeno Finance Tracker"
    );

    const recipients = [new Recipient(email, email)];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject(subject)
      .setHtml(html)
      .setText(text);

    const response = await mailerSend.email.send(emailParams);

    if (response) {
      console.log(response);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = mailSender;

// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const mailSender = async (email, subject, text, html) => {
//   try {
//     const message = {
//       to: email,
//       from: process.env.MAIL_SENDER,
//       subject: subject,
//       text: text,
//       html: html,
//     };

//     await sgMail.send(message);

//     console.log("Email sent");
//   } catch (error) {
//     console.error("Unable to send email: ", error);
//   }
// };

// module.exports = mailSender;
