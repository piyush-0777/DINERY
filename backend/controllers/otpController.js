
const Restaurant = require('../models/restaurant-model')
const otpService = require('../services/otpService')
const validateEmail = require("../services/emailValidationService");

exports.sendOTP = async (req, res) => {
  try {

    const ownerEmail = req.body.ownerEmail?.trim().toLowerCase();
    const restaurantName = req.body.restaurantName?.trim();
    
    if (!ownerEmail || !restaurantName) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // 2. Check if user already exists
    const existingRestaurant = await Restaurant.findOne({ ownerEmail });
    if (existingRestaurant) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }

    const existingResName = await Restaurant.findOne({ restaurantName })
    if (existingResName) {
      return res.status(409).json({
        error: "restaurant is already exit.."
      })
    }
    
    const result = await validateEmail(ownerEmail);

if (!result.success) {
    return res.status(400).json(result);
}

    const data = await otpService.sendOTP(ownerEmail)
   

    res.status(201).json({ message: 'otp send seccessfuly' })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'server error 121' })
  }



}

exports.verifyOTP = async (req, res) => {
      try {
        const ownerEmail = req.body.ownerEmail?.trim().toLowerCase();
        const otp = req.body.otp?.trim();
        if (!ownerEmail || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const data = await otpService.verifyOTP(ownerEmail, otp);

        return res.status(data.statusCode || 200).json(data);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }

}