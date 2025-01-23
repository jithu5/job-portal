const nodemailer = require('nodemailer');

const sendMail = async (to,subject,html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            }

        });
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (err) {
        console.log(err);
    }
}

module.exports = sendMail;
        
        