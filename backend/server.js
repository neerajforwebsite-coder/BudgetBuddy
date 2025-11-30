import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import userRouter from "./routes/userRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import transactionRouter from "./routes/transactionRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* -------------------- MONGO DB CONNECTION -------------------- */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* -------------------- API ROUTES -------------------- */
app.use("/api/auth", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/transaction", transactionRouter);

/* -------------------- SERVE FRONTEND BUILD -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

/* -------------------- START SERVER -------------------- */
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
