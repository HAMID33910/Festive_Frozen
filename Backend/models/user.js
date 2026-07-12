// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   phone: {
//     type: String,
//     unique: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: String,
  
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
  
// });





// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);