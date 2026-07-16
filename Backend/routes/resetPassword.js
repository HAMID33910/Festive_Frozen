const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");
const OTP = require("../models/Otp");

router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Check if OTP was verified
    const otpRecord = await OTP.findOne({ email });
    console.log("Reset Route OTP:", otpRecord);

    if (!otpRecord || !otpRecord.verified) {
      return res.status(400).json({
        success: false,
        message: "OTP verification required.",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    // Delete OTP after successful reset
    await OTP.deleteMany({ email });

    res.json({
      success: true,
      message: "Password updated successfully.",
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