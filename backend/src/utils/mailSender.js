const nodemailer = require("nodemailer");

const mailSender = (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    transporter.sendMail(
      {
        from: process.env.MAIL_USER,
        to: email,
        subject: title,
        html: body,
      },
      (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      }
    );
  } catch (error) {
    throw new Error(`Something Went Wrong: ${error}`);
  }
};

module.exports = mailSender;
