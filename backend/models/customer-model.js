const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  name: String,
  phone: String,
  table: {type:mongoose.Schema.Types.ObjectId , ref: "Table"},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Customer", CustomerSchema);
