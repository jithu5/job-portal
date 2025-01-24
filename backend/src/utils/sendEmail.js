const nodemailer = require('nodemailer');
const axios = require('axios');
const sendMail = async (to,subject,html) => {
  
    //using api
    const mailOptions = {
        sender:{email: process.env.SMTP_EMAIL},
        to: [{email:to}],
        subject:subject,
        htmlContent:html,
    };
    try {
         const response = await axios.post('https://api.brevo.com/v3/smtp/email',mailOptions,{
            headers:{
                'api-key':process.env.SMTP_API_KEY,
                'Content-Type': 'application/json'
            }
         });
         console.log("email send successfully",response.data);
    } catch (error) {
        console.log("Error sending email",error.response.data);
    }
}

module.exports = sendMail;
        
        