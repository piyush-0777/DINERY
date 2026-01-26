const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  name: String ,
  image:{type:String , require:true} ,
  publicId:{type:String , require:true} ,
});

module.exports = mongoose.model("Category", CategorySchema);
