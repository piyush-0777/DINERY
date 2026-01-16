const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },

  billAmount: Number,
  tax: Number,
  finalAmount: Number,

  paymentStatus: { type: String, enum: ["paid","unpaid"], default: "unpaid" },
  paymentMode: { type: String, enum: ["cash","upi","card"] },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bill", BillSchema);
