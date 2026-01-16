const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      quantity: Number,
      subtotal: Number
    }
  ],

  totalAmount: Number,
  status: {
    type: String,
    enum: ["pending","preparing","completed","cancelled"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
