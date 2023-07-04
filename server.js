import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import shareRoute from "./routes/shares.js";

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(express.json());

//mongodb connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("mongoDB connected");
  } catch (error) {
    throw error;
  }
};

//set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

//create uploads middleware
const upload = multer({ storage: storage });
app.post("api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//API endpoint for image upload
app.use(upload.single("image"));

//middleware
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
