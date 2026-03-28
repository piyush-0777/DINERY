const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const {authenticateResturant} = require('../middlewares/authMiddleware')



// Orders per day/week/month
router.get("/orders",authenticateResturant, analyticsController.getOrdersAnalytics);

// Revenue trend per day/week/month
router.get("/revenue",authenticateResturant, analyticsController.getRevenueTrend);

// Top selling items per day/week/month
router.get("/top-items",authenticateResturant, analyticsController.getTopSellingItems);

// Order type (Dine-in vs Online)
// router.get("/order-type",authenticateResturant, analyticsController.getOrderTypeAnalytics);

// // Compare revenue periods
// router.get("/compare",authenticateResturant, analyticsController.compareRevenue);

module.exports = router;

