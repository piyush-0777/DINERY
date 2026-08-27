const otpService = require("../services/otpService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.sendOTP = async (req, res) => {
  try {
    const ownerEmail = req.body.ownerEmail?.trim().toLowerCase();
    const restaurantName = req.body.restaurantName?.trim();

    if (!ownerEmail || !restaurantName) {
      return sendError(res, 400, "Email and restaurant name are required");
    }

    const result = await otpService.sendOTP(ownerEmail, restaurantName);
    return sendSuccess(res, 201, result.message || "OTP sent successfully");
  } catch (error) {
    console.error("sendOTP error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const ownerEmail = req.body.ownerEmail?.trim().toLowerCase();
    const otp = req.body.otp?.toString().trim();

    if (!ownerEmail || !otp) {
      return sendError(res, 400, "Email and OTP are required");
    }

    const data = await otpService.verifyOTP(ownerEmail, otp);
    if (!data.success) {
      return sendError(res, data.statusCode || 400, data.message || "Invalid OTP");
    }

    return sendSuccess(res, data.statusCode || 200, data.message || "OTP verified successfully");
  } catch (error) {
    console.error("verifyOTP error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};