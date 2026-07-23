const RestaurantModel = require("../models/restaurant-model");
const mongoose = require("../config/mongoDB-connection");
const bcrypt = require("bcrypt");
const deleteImage = require("../utils/deletImg");

exports.UpdateRestaurantProfile = async (
  image,
  restaurantId,
  newRestaurantName,
  newAddress
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const restaurant = await RestaurantModel.findById(restaurantId).session(
      session
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Check duplicate restaurant name
    if (
      restaurant.restaurantName !== newRestaurantName &&
      (await RestaurantModel.exists({
        restaurantName: newRestaurantName,
        _id: { $ne: restaurantId },
      }).session(session))
    ) {
      throw new Error("Restaurant name already exists");
    }

    const oldPublicId = restaurant.publicId;

    if (image) {
      restaurant.profileImg = image.path;
      restaurant.publicId = image.filename;
    }

    restaurant.restaurantName = newRestaurantName;
    restaurant.address = newAddress;

    await restaurant.save({ session });

    await session.commitTransaction();

    // Delete previous image after successful commit
    if (image && oldPublicId) {
      try {
        await deleteImage(oldPublicId);
      } catch (err) {
        console.error("Image delete error:", err);
      }
    }

    return restaurant;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

exports.UpdateOwnerInformation = async (
  restaurantId,
  ownerName,
  ownerPhone,
  ownerEmail
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const restaurant = await RestaurantModel.findById(restaurantId).session(
      session
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    // Check duplicate email
    if (
      restaurant.ownerEmail !== ownerEmail &&
      (await RestaurantModel.exists({
        ownerEmail,
        _id: { $ne: restaurantId },
      }).session(session))
    ) {
      throw new Error("Email already exists");
    }

    restaurant.ownerName = ownerName;
    restaurant.ownerPhone = ownerPhone;
    restaurant.ownerEmail = ownerEmail;

    await restaurant.save({ session });

    await session.commitTransaction();

    return restaurant;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

exports.UpdateGSTNumber = async (restaurantId, gstNumber) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const restaurant = await RestaurantModel.findById(restaurantId).session(
      session
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    restaurant.gstNumber = gstNumber;

    await restaurant.save({ session });

    await session.commitTransaction();

    return restaurant;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

exports.UpdatePassword = async (
  restaurantId,
  currentPassword,
  newPassword
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const restaurant = await RestaurantModel.findById(restaurantId).session(
      session
    );

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      restaurant.password
    );

    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      restaurant.password
    );

    if (samePassword) {
      throw new Error(
        "New password cannot be the same as the current password"
      );
    }

    restaurant.password = await bcrypt.hash(newPassword, 10);

    await restaurant.save({ session });

    await session.commitTransaction();

    return true;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};