const fs = require("fs");
const path = require("path");
const mailSender = require("./mailSender");

const notifyEmail = async (email, subject, text) => {
  const templatePath = path.join(__dirname, "../html", "notifyUser.html");

  let html = fs.readFileSync(templatePath, "utf-8");
  html = html.replace("{{message}}", text);

  try {
    await mailSender(email, subject, text, html);
  } catch (error) {
    console.error(error);
  }
};

module.exports = notifyEmail;
