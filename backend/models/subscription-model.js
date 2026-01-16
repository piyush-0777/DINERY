const mongoose = require('mongoose')

const SubscriptionSchema = mongoose.Schema({
    restaurant:{type:mongoose.Schema.Types.ObjectId , ref:'Restaurant'},
    plan: { type: String, enum: ["free", "premium"], default: "free" },
    price: Number,
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true }
})

module.exports = mongoose.model('Subscription' , SubscriptionSchema)