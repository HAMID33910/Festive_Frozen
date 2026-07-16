const express = require("express");

const router = express.Router();

const OTP = require("../models/Otp");

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: "OTP not found.",
      });
    }

    if (otpData.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpData._id });

      return res.status(400).json({
        success: false,
        message: "OTP expired.",
      });
    }

    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    // Mark verified
    otpData.verified = true;

    await otpData.save();

    console.log("OTP verified for:", email);

    return res.json({
      success: true,
      message: "OTP verified successfully.",
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;