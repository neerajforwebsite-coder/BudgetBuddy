require("dotenv").config();
const http = require("http");
const express = require("express");
const app = require("./app");
const connectDB = require("./config/db");

// ROUTERS
const userRouter = require("./routes/userRouter");
const transactionRouter = require("./routes/transactionRouter");
const categoryRouter = require("./routes/categoryRouter");

// CONNECT DATABASE
connectDB();

// MOUNT ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/categories", categoryRouter);

// SERVER SETUP
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
