require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const categoryRoute = require("./routes/categories");
const productRoute = require("./routes/products");
// const orderRoute = require("./routes/orders");
const dashboardRoute = require("./routes/dashboard");
const dealRoute = require("./routes/deals");
const orderRoute = require("./routes/orders");
const cartRoute = require("./routes/cart");
const searchRoute = require("./routes/search");
const wishlistRoute = require("./routes/wishlist");
const bannerRoute = require("./routes/banners");
const forgotRoute = require("./routes/forgotPassword");
const resetPasswordRoute = require("./routes/resetPassword");
const verifyOtpRoute = require("./routes/verifyOtp");
const googleLoginRoute = require("./routes/googleLogin");

const app = express();

/* ===========================
   Middleware
=========================== */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/dealuploads",
  express.static("dealuploads")
);

/* ===========================
   Static Upload Folders
=========================== */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/productuploads", express.static(path.join(__dirname, "productuploads")));
app.use("/dealuploads", express.static(path.join(__dirname, "dealuploads")));
app.use("/api/orders", orderRoute);
app.use("/api/cart", cartRoute);
app.use("/api/search", searchRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/banneruploads", express.static("banneruploads"));


/* ===========================
   MongoDB
=========================== */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ===========================
   Routes
=========================== */

// Authentication
app.use("/api/signup", signupRoute);
app.use("/api/auth/login", loginRoute);

// Categories
app.use("/api/categories", categoryRoute);

// Products
app.use("/api/products", productRoute);

// Orders
app.use("/api/orders", orderRoute);

// Dashboard
app.use("/api/dashboard", dashboardRoute);

// DEALS

app.use("/api/deals", dealRoute);

// banner
app.use("/api/banners", bannerRoute);
// forget password

app.use("/api/auth", forgotRoute);

app.use("/api/auth", resetPasswordRoute);


app.use("/api/auth", verifyOtpRoute);

app.use("/api/google-login", googleLoginRoute);

/* ===========================
   Home Route
=========================== */

app.get("/", (req, res) => {
  res.send("Festive Frozen Backend Running...");
});

/* ===========================
   Server
=========================== */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});