const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  planKey: {
    type: String,
    required: true,
    unique: true,
    enum: ["1_month", "3_months", "12_months"],
  },
  title: {
    type: String,
    required: true,
  },
  durationDays: {
    type: Number,
    required: true,
  },
  priceINR: {
    type: Number,
    required: true,
  },
  priceUSD: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  badge: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  features: [
    {
      label: String,
      available: { type: Boolean, default: true },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Pricing", PricingSchema);
