const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");
const reportController = require("../controllers/reportController");

const router = express.Router();

// Protected: Only Owner or Admin can access business reports
router.get(
  "/customer-report",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  reportController.getCustomerReport
);

router.get(
  "/dailySale-report",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  reportController.getDailySaleReport
);

router.get(
  "/GST-report",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  reportController.getGSTReport
);

router.get(
  "/monthlyRevenue-report",
  authenticate,
  authorize(ROLES.OWNER, ROLES.ADMIN),
  reportController.getMonthlyRevenueReport
);

module.exports = router;
