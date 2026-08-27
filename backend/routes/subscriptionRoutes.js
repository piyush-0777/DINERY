const express = require("express");
const subscriptionController = require("../controllers/subscriptionController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public / Owner: Fetch active subscription tiers (in INR & USD)
router.get("/plans", (req, res) => subscriptionController.getPlans(req, res));

// Owner Protected: Fetch live status, days left on trial/plan
router.get("/status", authenticate, (req, res) => subscriptionController.getStatus(req, res));

// Owner Protected: Create Razorpay Order for subscription upgrade
router.post("/create-order", authenticate, (req, res) =>
  subscriptionController.createOrder(req, res)
);

// Owner Protected: Verify Razorpay signature & activate subscription
router.post("/verify-payment", authenticate, (req, res) =>
  subscriptionController.verifyPayment(req, res)
);

// Owner Protected: Direct activation fallback
router.post("/activate", authenticate, (req, res) =>
  subscriptionController.activateSubscription(req, res)
);

module.exports = router;
