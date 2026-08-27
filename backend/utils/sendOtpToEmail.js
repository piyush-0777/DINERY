const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.MYPASS,
        },
    });
};


 // Replace with generated OTP





const sendMail = async (emailID , otp ) => {
    try {
        const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dinery OTP Verification</title>

<style>
body{
    margin:0;
    padding:0;
    background:#f4f4f4;
    font-family:Arial,Helvetica,sans-serif;
}

.container{
    max-width:600px;
    margin:30px auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 5px 15px rgba(0,0,0,.08);
}

.header{
    background:#0f172a;
    padding:35px;
    text-align:center;
}

.header h1{
    margin:0;
    color:#ffffff;
    font-size:30px;
}

.content{
    padding:35px;
    color:#374151;
    line-height:1.7;
    font-size:16px;
}

.otp-box{
    margin:30px auto;
    background:#eff6ff;
    border:2px dashed #2563eb;
    width:220px;
    text-align:center;
    padding:18px;
    border-radius:10px;
}

.otp{
    font-size:34px;
    font-weight:bold;
    letter-spacing:8px;
    color:#2563eb;
}

.warning{
    background:#fff7ed;
    border-left:4px solid #f97316;
    padding:15px;
    border-radius:6px;
    margin-top:25px;
    color:#7c2d12;
}

.footer{
    background:#f8fafc;
    text-align:center;
    padding:20px;
    font-size:13px;
    color:#64748b;
}

.footer a{
    color:#2563eb;
    text-decoration:none;
}
</style>
</head>

<body>

<div class="container">

    <div class="header">
        <h1>🍽️ Dinery</h1>
    </div>

    <div class="content">

        <h2>Hello,</h2>

        <p>
            We received a request to verify your email for your
            <strong>Dinery Restaurant POS System</strong> account.
        </p>

        <p>Your One-Time Password (OTP) is:</p>

        <div class="otp-box">
            <div class="otp">${otp}</div>
        </div>

        <p>
            This OTP is valid for
            <strong>10 minutes</strong>.
        </p>

        <div class="warning">
            <strong>Security Notice</strong><br>
            Never share this OTP with anyone. Dinery will never ask for your OTP by email, phone, or message.
        </div>

        <p style="margin-top:30px;">
            If you didn't request this verification, you can safely ignore this email.
        </p>

        <p>
            Thanks,<br>
            <strong>Dinery Team</strong>
        </p>

    </div>

    <div class="footer">
        © 2026 Dinery Restaurant POS System<br><br>
        Helping restaurants manage orders, tables, and customers efficiently.
    </div>

</div>

</body>
</html>
`;
        const transporter = createTransporter();
        const mailOptions = {
            from: `"Dinery" <${process.env.EMAIL}>`,
            to: emailID,
            subject: "Your Dinery Verification Code",
            text: `Your Dinery OTP is ${otp}. It is valid for 10 minutes. Do not share it with anyone.`,
            html: htmlTemplate,
        };

        const res = await transporter.sendMail(mailOptions);
        return res;
    } catch (error) {
        console.error("sendMail error:", error);
        throw error;
    }
};

module.exports = sendMail