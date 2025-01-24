const PASSWORD_RESET_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
        }
        h1 {
            color: #4CAF50;
            text-align: center;
        }
        p {
            font-size: 16px;
            line-height: 1.6;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            text-align: center;
            margin-top: 10px;
        }
        .footer {
            font-size: 12px;
            color: #777;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Password Reset Request</h1>
        <p>Hi there,</p>
        <p>We received a request to reset the password for your account.</p>
        <p>To reset your password, please use the following **One-Time Password (OTP)**:</p>
        <div class="otp">{{otp}}</div>
        <p>This OTP will expire in 5 minutes, so please enter it quickly to reset your password.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you for using our service!</p>
        <div class="footer">
            <p>If you need assistance, feel free to contact our support team.</p>
        </div>
    </div>
</body>
</html>`

module.exports = PASSWORD_RESET_TEMPLATE;