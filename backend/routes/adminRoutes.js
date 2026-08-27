const express = require("express");
const adminController = require("../controllers/adminController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");

const router = express.Router();

// Strict Admin Gate: Only users with role: 'admin' can access these routes
router.use(authenticate, authorize(ROLES.ADMIN));

// Platform Overview & Management
router.get("/restaurants", (req, res) => adminController.getAllRestaurants(req, res));
router.post("/restaurants", (req, res) => adminController.createRestaurantOwner(req, res));
router.delete("/restaurants/:restaurantId", (req, res) => adminController.deleteRestaurant(req, res));
router.get("/users", (req, res) => adminController.getAllUsers(req, res));
router.get("/stats", (req, res) => adminController.getPlatformStats(req, res));
router.patch("/restaurants/:restaurantId/plan", (req, res) =>
  adminController.updateRestaurantPlan(req, res)
);
router.patch("/restaurants/:restaurantId/role", (req, res) =>
  adminController.updateUserRole(req, res)
);

// Manual Premium Grant for any restaurant
router.post("/restaurants/:restaurantId/grant-premium", (req, res) =>
  adminController.grantPremium(req, res)
);

// Revoke Premium Subscription for any restaurant
router.post("/restaurants/:restaurantId/revoke-premium", (req, res) =>
  adminController.revokePremium(req, res)
);

// Dynamic Pricing Management (1M, 3M, 12M in INR & USD)
router.get("/pricing", (req, res) => adminController.getPricing(req, res));
router.put("/pricing/:planKey", (req, res) => adminController.updatePricing(req, res));

module.exports = router;
