const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, uid, photo } = req.body;

    if (!email || !uid) {
      return res.status(400).json({
        success: false,
        message: "Email and UID are required.",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName: firstName || "Google",
        lastName: lastName || "User",
        email,
        googleId: uid,
        photo: photo || "",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
});

module.exports = router;