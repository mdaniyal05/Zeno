const fs = require("fs");
const path = require("path");
const mailSender = require("./mailSender");

const notifyEmail = async (email, message, title) => {
  const templatePath = path.join(__dirname, "../html", "notifyUser.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  html = html.replace("{{message}}", message);

  try {
    mailSender(email, title, html);
    return true;
  } catch (error) {
    throw new Error(`Error occured while sending email: ${error}`);
  }
};

module.exports = notifyEmail;
