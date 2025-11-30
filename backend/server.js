const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API ROUTES
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/transactions", transactionRouter);

// Render health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Deployment handling for Frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
