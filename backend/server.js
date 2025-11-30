const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

const userRoutes = require("./routes/userRouter");
const transactionRoutes = require("./routes/transactionRouter");
const categoryRoutes = require("./routes/categoryRouter");

dotenv.config();
connectDb();

const app = express();

// CORS FIX FOR RENDER 🚀
app.use(
  cors({
    origin: "*", // allow ALL requests
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());

// ROUTES
app.use("/api/auth", userRoutes); // REGISTER + LOGIN
app.use("/api/transactions", transactionRoutes);
app.use("/api/category", categoryRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running on Render!");
});

// PORT CONFIG
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
