const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");

// Protected: Only Owner or Admin can access business analytics
router.get(
  "/orders",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  analyticsController.getOrdersAnalytics
);

router.get(
  "/revenue",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  analyticsController.getRevenueTrend
);

router.get(
  "/top-items",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  analyticsController.getTopSellingItems
);

module.exports = router;
