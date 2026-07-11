// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   phone: {
//     type: String,
//     unique: true
//   },
//   email: {
//     type: String,
//     unique: true
//   },
//   password: String
// });

// const User = mongoose.model("User", userSchema);

// app.post("/api/signup", async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       phone,
//       email,
//       password,
//       confirmPassword
//     } = req.body;

//     if (password !== confirmPassword) {
//       return res.json({
//         success: false,
//         message: "Passwords do not match"
//       });
//     }

//     const userExists = await User.findOne({
//       $or: [{ email }, { phone }]
//     });

//     if (userExists) {
//       return res.json({
//         success: false,
//         message: "User already exists"
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       firstName,
//       lastName,
//       phone,
//       email,
//       password: hashedPassword
//     });

//     res.json({
//       success: true,
//       message: "Account Created Successfully"
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       message: "Server Error"
//     });
//   }
// });


// // ==========================
// // Login API
// // ==========================

// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if email and password are provided
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and Password are required.",
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "Email not found.",
//       });
//     }

//     // Compare entered password with hashed password
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Incorrect password.",
//       });
//     }

//     // Generate JWT Token
//     const token = jwt.sign(
//       {
//         id: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "7d",
//       }
//     );

//     // Send response
//     res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       token,
//       user: {
//         id: user._id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone,
//       },
//     });
//   } catch (err) {
//     console.log(err);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// });



// app.listen(3001, () => {
//   console.log("Server Running on Port 3001");
// });


const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const userExists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Account Created Successfully",
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