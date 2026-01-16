const mongoose = require('mongoose');

const TableSchema = mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    tableNumber: String,
    tableId: {type:Number , require:true},
    qrCode: String,
    status: { type: String, enum: ["available","occupied"], default: "available" }
})

module.exports = mongoose.model('Table' , TableSchema)