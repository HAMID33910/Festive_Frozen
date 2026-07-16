const express = require("express");

const router = express.Router();

const User = require("../models/User");

const OTP = require("../models/Otp");

const sendOTP = require("../utils/sendMail");

router.post("/send-otp", async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "Email not registered.",

            });

        }

        const otp = Math.floor(

            100000 + Math.random() * 900000

        ).toString();

        await OTP.deleteMany({ email });

        await OTP.create({

            email,

            otp,

            expiresAt: new Date(Date.now() + 5 * 60 * 1000),

        });

        await sendOTP(email, otp);

        res.json({

            success: true,

            message: "OTP sent successfully.",

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Please request a new OTP.",
      });
    }

    // Check expiry (5 minutes)
    if (new Date() > otpData.expiresAt) {
      await OTP.deleteOne({ _id: otpData._id });

      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    // Check OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // OTP verified successfully
    otpData.verified = true;

await otpData.save();

return res.json({
    success: true,
    message: "OTP verified successfully.",
});

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;