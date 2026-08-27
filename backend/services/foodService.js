const mongoose = require("../config/mongoDB-connection");
const foodRepository = require("../repositories/foodRepository");
const deleteImage = require("../utils/deletImg");

class FoodService {
  async getAllFood(restaurantId) {
    return await foodRepository.findAllByRestaurant(restaurantId);
  }

  async getFoodById(foodId) {
    const food = await foodRepository.findById(foodId);
    if (!food) {
      const error = new Error("Food item not found");
      error.statusCode = 404;
      throw error;
    }
    return food;
  }

  async createFood({ restaurantId, name, description, price, category, file }) {
    if (!restaurantId) {
      const error = new Error("Restaurant is not authenticated");
      error.statusCode = 401;
      throw error;
    }

    if (!file) {
      const error = new Error("Food image is required");
      error.statusCode = 400;
      throw error;
    }

    const food = await foodRepository.create({
      restaurant: restaurantId,
      name,
      description,
      price,
      category,
      foodImg: file.path,
      publicId: file.filename,
    });

    return food;
  }

  async editFood(foodId, { name, description, price, category, isAvailable, file }) {
    const food = await foodRepository.findById(foodId);
    if (!food) {
      const error = new Error("Food item not found");
      error.statusCode = 404;
      throw error;
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (category !== undefined) updateData.category = category;
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;

    if (file) {
      if (food.publicId) {
        await deleteImage(food.publicId);
      }
      updateData.foodImg = file.path;
      updateData.publicId = file.filename;
    }

    return await foodRepository.update(foodId, updateData);
  }

  async changeAvailability(foodId) {
    const updated = await foodRepository.toggleAvailability(foodId);
    if (!updated) {
      const error = new Error("Food item not found");
      error.statusCode = 404;
      throw error;
    }
    return updated;
  }

  async deletFood(foodId, restaurantId, session = null) {
    let localSession = session;

    try {
      if (!localSession) {
        localSession = await mongoose.startSession();
        localSession.startTransaction();
      }

      const food = await foodRepository.findById(foodId, localSession);
      if (!food) {
        const error = new Error("Food item not found");
        error.statusCode = 404;
        throw error;
      }

      await foodRepository.deleteById(foodId, localSession);

      if (!session) {
        await localSession.commitTransaction();
        localSession.endSession();
      }

      if (food.publicId) {
        await deleteImage(food.publicId);
      }

      return true;
    } catch (error) {
      if (!session && localSession) {
        await localSession.abortTransaction();
        localSession.endSession();
      }
      throw error;
    }
  }
}

module.exports = new FoodService();