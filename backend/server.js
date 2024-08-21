import express from "express";
import cors from "cors";
import multer from "multer";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "token, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/uploads", express.static("uploads"));

// Image Storage engine
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: Storage });

// Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
