const brevo = require("@getbrevo/brevo");

const mailSender = async (email, subject, text, html) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = {
      name: "Zeno",
      email: process.env.SENDER_EMAIL,
    };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.textContent = text;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent:", result);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = mailSender;
