const otpRepository = require("../repositories/otpRepository");
const restaurantRepository = require("../repositories/restaurantRepository");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../utils/sendOtpToEmail");
const validateEmail = require("./emailValidationService");

class OTPService {
  async sendOTP(ownerEmail, restaurantName) {
    if (!ownerEmail || !restaurantName) {
      const error = new Error("Email and restaurant name are required");
      error.statusCode = 400;
      throw error;
    }

    const existingEmail = await restaurantRepository.findByEmail(ownerEmail);
    if (existingEmail) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      throw error;
    }

    const existingName = await restaurantRepository.findByName(restaurantName);
    if (existingName) {
      const error = new Error("Restaurant name is already in use");
      error.statusCode = 409;
      throw error;
    }

    const emailCheck = await validateEmail(ownerEmail);
    if (!emailCheck.success) {
      const error = new Error(emailCheck.message || "Invalid email address");
      error.statusCode = 400;
      throw error;
    }

    const existingOtp = await otpRepository.findByEmail(ownerEmail);
    if (existingOtp) {
      if (!existingOtp.verified && existingOtp.expiresAt > new Date()) {
        await sendMail(ownerEmail, existingOtp.otp);
        return { success: true, message: "OTP sent successfully" };
      }
      // If already expired or verified, remove old record to generate fresh OTP
      await otpRepository.deleteByEmail(ownerEmail);
    }

    const otpNumber = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const otp = await otpRepository.create({
      email: ownerEmail,
      otp: otpNumber,
      expiresAt,
    });

    await sendMail(ownerEmail, otp.otp);
    return { success: true, message: "OTP sent successfully" };
  }

  async verifyOTP(ownerEmail, otp) {
    if (!ownerEmail || !otp) {
      return {
        success: false,
        statusCode: 400,
        message: "Email and OTP are required",
      };
    }

    const otpData = await otpRepository.findByEmail(ownerEmail);
    if (!otpData) {
      return {
        success: false,
        statusCode: 404,
        message: "OTP not found.",
      };
    }

    if (otpData.verified) {
      return {
        success: false,
        statusCode: 400,
        message: "OTP has already been verified.",
      };
    }

    if (otpData.expiresAt < new Date()) {
      return {
        success: false,
        statusCode: 400,
        message: "OTP has expired.",
      };
    }

    if (Number(otp) !== otpData.otp) {
      return {
        success: false,
        statusCode: 400,
        message: "Invalid OTP.",
      };
    }

    await otpRepository.markVerified(otpData._id);

    return {
      success: true,
      statusCode: 200,
      message: "OTP verified successfully.",
    };
  }
}

module.exports = new OTPService();