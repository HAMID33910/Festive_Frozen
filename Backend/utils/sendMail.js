const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL,

        pass: process.env.EMAIL_PASSWORD,

    },

});

const sendOTP = async (email, otp) => {

    await transporter.sendMail({

        from: `"Festive Frozen" <${process.env.EMAIL}>`,

        to: email,

        subject: "Password Reset OTP",

        html: `

        <div style="font-family:Arial;padding:25px">

            <h2 style="color:#8f3f16">
            Festive Frozen
            </h2>

            <p>Your password reset OTP is</p>

            <h1 style="
            letter-spacing:8px;
            color:#8f3f16">
            ${otp}
            </h1>

            <p>
            This OTP expires in 5 minutes.
            </p>

            <p>
            Do not share this code.
            </p>

        </div>

        `

    });

};

module.exports = sendOTP;