const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  name: String,
  foodImg:{type:String , required: true} ,
  publicId:{type:String , required: true},
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model("Product", ProductSchema);
