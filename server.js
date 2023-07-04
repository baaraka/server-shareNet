import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import shareRoute from "./routes/shares.js";

const app = express();
dotenv.config();

//mongodb connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoDB connected");
  } catch (error) {
    throw error;
  }
};

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/shares", shareRoute);

//error handling middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went Wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(5000, () => {
  connect();
  console.log("backend is running");
});
