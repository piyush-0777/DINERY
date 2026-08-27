const Razorpay = require("razorpay");
require("dotenv").config();

const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

const isConfigured =
  Boolean(key_id && key_secret) &&
  key_id !== "rzp_test_placeholder" &&
  key_secret !== "razorpay_secret_placeholder";

let razorpayInstance = null;

if (isConfigured) {
  try {
    razorpayInstance = new Razorpay({
      key_id,
      key_secret,
    });
    console.log("✔ Razorpay client initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize Razorpay:", error);
  }
} else {
  console.log("ℹ Razorpay keys are in placeholder/test mode");
}

module.exports = {
  razorpay: razorpayInstance,
  isConfigured,
  key_id: key_id || "rzp_test_placeholder",
  key_secret: key_secret || "razorpay_secret_placeholder",
};
