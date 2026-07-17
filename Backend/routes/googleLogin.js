const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, uid, photo } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        googleId: uid,
        photo,
      });
    }

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      user,
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