const mongoose = require("mongoose");
const ROLES = require("../constants/roles");

const CustomerSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  name: String,
  phone: String,
  role: { type: String, enum: [ROLES.USER, "customer"], default: ROLES.USER },
  table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Customer", CustomerSchema);
