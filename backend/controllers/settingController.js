const settingService = require("../services/settingService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.UpdateRestaurantProfile = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return sendError(res, 401, "Unauthorized");
    }

    const { restaurantName, address } = req.body;
    if (!restaurantName?.trim()) {
      return sendError(res, 400, "Restaurant name is required");
    }

    if (!address?.trim()) {
      return sendError(res, 400, "Address is required");
    }

    const updatedRestaurant = await settingService.UpdateRestaurantProfile(
      req.file,
      restaurant._id,
      restaurantName.trim(),
      address.trim()
    );

    return sendSuccess(
      res,
      200,
      "Restaurant profile updated successfully",
      updatedRestaurant,
      { data: updatedRestaurant }
    );
  } catch (error) {
    console.error("UpdateRestaurantProfile error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal Server Error");
  }
};

exports.UpdateOwnerInformation = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return sendError(res, 401, "Unauthorized");
    }

    const { ownerName, ownerPhone, ownerEmail } = req.body;

    if (!ownerName?.trim()) {
      return sendError(res, 400, "Owner name is required");
    }

    if (!ownerPhone?.trim()) {
      return sendError(res, 400, "Owner phone is required");
    }

    if (!ownerEmail?.trim()) {
      return sendError(res, 400, "Owner email is required");
    }

    const data = await settingService.UpdateOwnerInformation(
      restaurant._id,
      ownerName.trim(),
      ownerPhone.trim(),
      ownerEmail.trim()
    );

    return sendSuccess(
      res,
      200,
      "Owner information updated successfully",
      data,
      { data }
    );
  } catch (error) {
    console.error("UpdateOwnerInformation error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal Server Error");
  }
};

exports.UpdateGSTNumber = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return sendError(res, 401, "Unauthorized");
    }

    const { gstNumber } = req.body;
    if (!gstNumber?.trim()) {
      return sendError(res, 400, "GST Number is required");
    }

    const data = await settingService.UpdateGSTNumber(
      restaurant._id,
      gstNumber.trim()
    );

    return sendSuccess(
      res,
      200,
      "GST number updated successfully",
      data,
      { data }
    );
  } catch (error) {
    console.error("UpdateGSTNumber error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal Server Error");
  }
};

exports.UpdatePassword = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return sendError(res, 401, "Unauthorized");
    }

    const { CurrentPassword, NewPassword } = req.body;

    if (!CurrentPassword) {
      return sendError(res, 400, "Current password is required");
    }

    if (!NewPassword) {
      return sendError(res, 400, "New password is required");
    }

    if (CurrentPassword === NewPassword) {
      return sendError(res, 400, "New password must be different from current password");
    }

    await settingService.UpdatePassword(
      restaurant._id,
      CurrentPassword,
      NewPassword
    );

    return sendSuccess(res, 200, "Password updated successfully");
  } catch (error) {
    console.error("UpdatePassword error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal Server Error");
  }
};