const EMAIL_VERIFY_TEMPLATE =` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            color: #333;
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
        .button {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            text-align: center;
            margin-top: 20px;
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
        <h1>Email Verification</h1>
        <p>Hi there,</p>
        <p>Thank you for signing up for our platform! Please use the following **One-Time Password (OTP)** to verify your account:</p>

        <div class="otp">{{otp}}</div>

        <p>This OTP will expire in 5 minutes, so please enter it quickly to verify your account.</p>

        <p>If you did not request this verification, please ignore this email.</p>


        <div class="footer">
            <p>If you need assistance, feel free to reach out to our support team.</p>
            <p>Thanks for choosing our service!</p>
        </div>
    </div>
</body>
</html>`

module.exports = EMAIL_VERIFY_TEMPLATE;