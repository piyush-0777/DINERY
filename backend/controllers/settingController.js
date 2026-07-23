const settingService = require("../services/settingService");

exports.UpdateRestaurantProfile = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const { restaurantName, address } = req.body;

    if (!restaurantName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Restaurant name is required",
      });
    }

    if (!address?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const updatedRestaurant = await settingService.UpdateRestaurantProfile(
      req.file,
      restaurant._id,
      restaurantName.trim(),
      address.trim()
    );

    return res.status(200).json({
      success: true,
      message: "Restaurant profile updated successfully",
      data: updatedRestaurant,
    });
  } catch (error) {
    console.error("UpdateRestaurantProfile:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.UpdateOwnerInformation = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { ownerName, ownerPhone, ownerEmail } = req.body;

    if (!ownerName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Owner name is required",
      });
    }

    if (!ownerPhone?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Owner phone is required",
      });
    }

    if (!ownerEmail?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Owner email is required",
      });
    }

    const data = await settingService.UpdateOwnerInformation(
      restaurant._id,
      ownerName.trim(),
      ownerPhone.trim(),
      ownerEmail.trim()
    );

    return res.status(200).json({
      success: true,
      message: "Owner information updated successfully",
      data,
    });
  } catch (error) {
    console.error("UpdateOwnerInformation:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.UpdateGSTNumber = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { gstNumber } = req.body;

    if (!gstNumber?.trim()) {
      return res.status(400).json({
        success: false,
        message: "GST Number is required",
      });
    }

    const data = await settingService.UpdateGSTNumber(
      restaurant._id,
      gstNumber.trim()
    );

    return res.status(200).json({
      success: true,
      message: "GST number updated successfully",
      data,
    });
  } catch (error) {
    console.error("UpdateGSTNumber:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

exports.UpdatePassword = async (req, res) => {
  try {
    const restaurant = req.restaurant;

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { CurrentPassword, NewPassword } = req.body;

    if (!CurrentPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password is required",
      });
    }

    if (!NewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password is required",
      });
    }

    if (CurrentPassword === NewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
      });
    }

    await settingService.UpdatePassword(
      restaurant._id,
      CurrentPassword,
      NewPassword
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("UpdatePassword:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};