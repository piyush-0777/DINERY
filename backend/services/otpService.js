const otpModel = require('../models/otp-model')
const generateOTP = require('../utils/generateOTP')
const sendMail = require('../utils/sendOtpToEmail')
const validateEmail = require("../services/emailValidationService");
exports.sendOTP = async (emailId) => {


    try {
        const otpNumber = generateOTP()




        const alOtp = await otpModel.findOne({ email: emailId })
        if (alOtp) {
            const responce = await sendMail(emailId, alOtp.otp);
            return responce;
        } else {
            const otp = await otpModel.create({
                email: emailId,
                otp: otpNumber,
                expiresAt: Date.now() + (15 * 60 * 1000)
            })

            const responce = await sendMail(emailId, otp.otp);
            return responce;
        }





    } catch (error) {
        console.log(error)
        throw new Error('server error')
    }
}

exports.verifyOTP = async (emailId, otp) => {
    try {
        const otpData = await otpModel.findOne({ email: emailId });

        if (!otpData) {
            return {
                success: false,
                statusCode: 404,
                message: "OTP not found."
            };
        }

        // Check if already verified
        if (otpData.verified) {
            return {
                success: false,
                statusCode: 400,
                message: "OTP has already been verified."
            };
        }

        // Check expiry
        if (otpData.expiresAt < new Date()) {
            return {
                success: false,
                statusCode: 400,
                message: "OTP has expired."
            };
        }

        // Compare OTP
        if (Number(otp) !== otpData.otp) {
            return {
                success: false,
                statusCode: 400,
                message: "Invalid OTP."
            };
        } else {
            // Mark as verified
            otpData.verified = true;
            await otpData.save();

            return {
                success: true,
                statusCode: 200,
                message: "OTP verified successfully."
            };
        }



    } catch (error) {
        console.error(error);
        throw new Error("Server error");
    }
};