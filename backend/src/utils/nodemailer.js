const SibApiV3Sdk = require('sib-api-v3-sdk');

// 1. Setup the Client
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// 2. Configure API Key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_KEY; // Your xkeysib- key

// 3. Create the API Instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendOTP = async (recipientEmail, otp) => {
    // 4. Build the email object
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "OTP for CodeConnect signup";
    sendSmtpEmail.htmlContent = `<html><body><p>Dear User, your OTP is <b>${otp}</b>. Valid for 5 minutes.</p></body></html>`;
    sendSmtpEmail.sender = { "name": "CodeConnect", "email": process.env.EMAIL_USER };
    sendSmtpEmail.to = [{ "email": recipientEmail }];

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        return data;
    } catch (error) {
        // Detailed error for debugging
        console.error("Mail Error:", error.response ? error.response.text : error.message);
        throw error;
    }
};

module.exports = sendOTP;