const mongoose = require("mongoose");
const ROLES = require("../constants/roles");

const RestaurantSchema = mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [ROLES.OWNER, ROLES.ADMIN, ROLES.USER],
    default: ROLES.OWNER,
  },
  profileImg: {
    type: String,
  },
  publicId: { type: String },
  ownerPhone: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
    unique: true,
  },

  // --- Subscription & Trial Management ---
  isPremium: {
    type: Boolean,
    default: true,
  },
  plan: {
    type: String,
    enum: ["free", "premium"],
    default: "premium",
  },
  currentPlan: {
    type: String,
    enum: ["trial", "1_month", "3_months", "12_months", "free"],
    default: "trial",
  },
  subscriptionStatus: {
    type: String,
    enum: ["trial", "active", "expired"],
    default: "trial",
  },
  trialStartedAt: {
    type: Date,
  },
  trialExpiresAt: {
    type: Date,
  },
  subscriptionExpiresAt: {
    type: Date,
    default: null,
  },
  premiumActivatedAt: {
    type: Date,
  },
  currencyPreference: {
    type: String,
    enum: ["INR", "USD"],
    default: "INR",
  },

  gstNumber: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);