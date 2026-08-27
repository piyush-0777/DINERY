const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");
const { updateOrderStatus, getOrderById } = require("../controllers/orderController");

const router = express.Router();

// Kitchen/Owner/Admin can update order progress
router.put("/:orderId/status", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), updateOrderStatus);

// Owner, Admin, or User can view order details
router.get("/:orderId", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN, ROLES.USER), getOrderById);

module.exports = router;