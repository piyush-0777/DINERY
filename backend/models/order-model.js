const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },

  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
      subtotal: Number
    }
  ],

  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending", // order is pending
      "preparing", // order is in kitchen 
      "served" , // order is plased
      "completed", // order is completed
      "cancelled" // order is cancelled
    ], 
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
