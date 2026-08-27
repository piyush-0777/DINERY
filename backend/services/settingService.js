const restaurantRepository = require("../repositories/restaurantRepository");
const { hashPasswordGenerater, hashPasswordChecker } = require("../utils/hashPassword");
const deleteImage = require("../utils/deletImg");

class SettingService {
  async UpdateRestaurantProfile(file, restaurantId, restaurantName, address) {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    let profileImg = restaurant.profileImg;
    let publicId = restaurant.publicId;

    if (file) {
      if (restaurant.publicId) {
        await deleteImage(restaurant.publicId);
      }
      profileImg = file.path;
      publicId = file.filename;
    }

    return await restaurantRepository.updateProfile(restaurantId, {
      restaurantName,
      address,
      profileImg,
      publicId,
    });
  }

  async UpdateOwnerInformation(restaurantId, ownerName, ownerPhone, ownerEmail) {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    // Check if new email is taken by another restaurant
    if (ownerEmail !== restaurant.ownerEmail) {
      const existing = await restaurantRepository.findByEmail(ownerEmail);
      if (existing && existing._id.toString() !== restaurantId.toString()) {
        const error = new Error("Email already registered with another account");
        error.statusCode = 409;
        throw error;
      }
    }

    return await restaurantRepository.updateOwnerInfo(restaurantId, {
      ownerName,
      ownerPhone,
      ownerEmail,
    });
  }

  async UpdateGSTNumber(restaurantId, gstNumber) {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    return await restaurantRepository.updateGSTNumber(restaurantId, gstNumber);
  }

  async UpdatePassword(restaurantId, currentPassword, newPassword) {
    const restaurant = await restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await hashPasswordChecker(currentPassword, restaurant.password);
    if (!isMatch) {
      const error = new Error("Incorrect current password");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await hashPasswordGenerater(newPassword);
    return await restaurantRepository.updatePassword(restaurantId, hashedPassword);
  }
}

module.exports = new SettingService();