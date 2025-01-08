// emailTemplate.js

module.exports.emailVerificationTemplete = (userName, OTP) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    background-color: #ffffff;
                    width: 100%;
                    max-width: 600px;
                    margin: 30px auto;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #4CAF50;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                    border-radius: 8px;
                }
                .otp {
                    font-size: 32px;
                    font-weight: bold;
                    color: #4CAF50;
                    text-align: center;
                    margin: 20px 0;
                }
                .message {
                    font-size: 16px;
                    color: #555555;
                    line-height: 1.6;
                    text-align: center;
                }
                .footer {
                    font-size: 12px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h2>Email Verification</h2>
                </div>
                
                <div class="message">
                    <p>Hi <strong>${userName}</strong>,</p>
                    <p>Thank you for registering with us! To complete your registration, please verify your email address by entering the OTP below.</p>
                </div>

                <div class="otp">
                    ${OTP}
                </div>

                <div class="message">
                    <p>The OTP is valid for <strong>5 minutes</strong>. Please use it within the given time frame.</p>
                    <p>If you did not request this, please ignore this email.</p>
                </div>

                <div class="footer">
                    <p>Best regards,</p>
                    <p>The Team at Your Website</p>
                </div>
            </div>
        </body>
        </html>
    `;
};
