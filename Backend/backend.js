require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/signup", signupRoute);

app.use("/api/auth/login", loginRoute);

app.listen(3001, () => {
  console.log("Server Running on Port 3001");
});