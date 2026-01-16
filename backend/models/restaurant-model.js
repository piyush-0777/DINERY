const mongoose = require('mongoose');

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    profileImg: {
        type: String
    },
    ownerPhone: {
        type: String,
        required: true
    },
    ownerEmail: {
         type: String,
         required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    plan: {
        type: String,
        enum: ["free", "premium"],
        default: "free"
    },
    premiumActivatedAt: {
        type: Date
    },
    gstNumber: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Restaurant' , RestaurantSchema)