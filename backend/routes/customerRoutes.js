const express = require("express");
const router = express.Router();
const {
  customerLogin,
  loadCustomerDashbord,
  customerPlaceOrder,
} = require("../controllers/customerController");
const { authenticateCustomer, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");

// Public: Customer check-in via table QR token
router.post("/:restaurantName/login", customerLogin);

// Protected: Only User (customer) with an active table/session token
router.get(
  "/:restaurantName/loadCustomerDashbord",
  authenticateCustomer,
  authorize(ROLES.USER),
  loadCustomerDashbord
);

router.post(
  "/:restaurantName/placeOrder",
  authenticateCustomer,
  authorize(ROLES.USER),
  customerPlaceOrder
);

module.exports = router;