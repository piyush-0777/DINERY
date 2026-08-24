const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoDB_connection = require("./config/mongoDB-connection");
const errorMiddleware = require("./middlewares/errorMiddleware");
const { initSocket } = require("./socket/socketServer");
const { sendError } = require("./utils/responseHandler");

// Routes
const restaurantRoutes = require("./routes/restaurantRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tableRoutes = require("./routes/tableRoutes");
const customerRoutes = require("./routes/customerRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");
const billRoutes = require("./routes/billRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const reportRoutes = require("./routes/reportRouter");
const settingRoutes = require("./routes/settingRoutes");

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/bill", billRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/setting", settingRoutes);

// Catch-all 404 handler for undefined API routes
app.use((req, res) => {
  return sendError(res, 404, `Route ${req.originalUrl} not found`);
});

// Centralized Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.EXPRESS_PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server + Socket.io running on port ${PORT}`);
});

module.exports = { app, server };
