const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoDB_connection = require("./config/mongoDB-connection");
const errorMiddleware = require("./middlewares/errorMiddleware");
const subscriptionGuard = require("./middlewares/subscriptionGuard");
const pricingRepository = require("./repositories/pricingRepository");
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
const adminRoutes = require("./routes/adminRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

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

// Seed default dynamic pricing plans on startup
pricingRepository.seedDefaultPricing().catch((err) => {
  console.error("Error seeding default pricing plans:", err);
});

// API Routes
// Public & Authentication
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/admin", adminRoutes);

// Operational Routes (Protected by Hard Paywall Subscription Guard)
app.use("/api/category", subscriptionGuard, categoryRoutes);
app.use("/api/tables", subscriptionGuard, tableRoutes);
app.use("/api/food", subscriptionGuard, foodRoutes);
app.use("/api/order", orderRoutes); // Has mixed customer/owner routes; status update is guarded
app.use("/api/bill", billRoutes);
app.use("/api/analytics", subscriptionGuard, analyticsRoutes);
app.use("/api/report", subscriptionGuard, reportRoutes);

// Catch-all 404 handler for undefined API routes
app.use((req, res) => {
  return sendError(res, 404, `Route ${req.originalUrl} not found`);
});

// Centralized Error Handling Middleware
app.use(errorMiddleware);

const PORT = process.env.EXPRESS_PORT || 3000;
if (!process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`Server + Socket.io running on port ${PORT}`);
  });
}

// Attach server and self references to maintain complete compatibility
app.server = server;
app.app = app;
app.default = app;

module.exports = app;
