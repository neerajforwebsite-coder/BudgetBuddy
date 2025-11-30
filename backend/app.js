require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routers
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");

// Error Handler
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const app = express();

// -------------------------
// ⭐ Connect to MongoDB Atlas
// -------------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// -------------------------
// ⭐ CORS
// -------------------------
app.use(
  cors({
    origin: ["http://localhost:5173"], // React frontend
    credentials: true,
  })
);

// Enable JSON parsing
app.use(express.json());

// -------------------------
// ⭐ API Routes
// -------------------------
app.use("/api/v1/users", userRouter);          // FIXED ✔
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/transactions", transactionRouter);

// -------------------------
// ⭐ Error Handler
// -------------------------
app.use(errorHandler);

// -------------------------
// ⭐ Start Server
// -------------------------
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
