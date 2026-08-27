const express = require("express");
const { login, registerRestaurant, getDashBord } = require("../controllers/restaurantController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const ROLES = require("../constants/roles");
const { sendOTP, verifyOTP } = require("../controllers/otpController");

const router = express.Router();

router.post("/otp", sendOTP);
router.post("/verifyOTP", verifyOTP);
router.post("/login", login);
router.post("/registerRestaurant", registerRestaurant);

// Protected: Only Owner or Admin can view the restaurant dashboard
router.get("/dashboard", authenticate, authorize(ROLES.OWNER, ROLES.ADMIN), getDashBord);

module.exports = router;
