const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    email: {type:String , require:true} ,
    otp: {type:Number , require: true} ,
    expiresAt: {type:Date , require: true , index: {expires: 0}} ,
    verified: {type:Boolean , default:false}
}, {
    timestamps: true ,
})

const OTP = mongoose.model('OTP' , otpSchema)

module.exports = OTP;