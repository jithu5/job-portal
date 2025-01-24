const nodemailer = require('nodemailer');

const sendMail = async (to,subject,html) => {
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
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
        
        