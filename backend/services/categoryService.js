const mongoose = require("../config/mongoDB-connection");
const categoryRepository = require("../repositories/categoryRepository");
const foodRepository = require("../repositories/foodRepository");
const foodService = require("./foodService");
const deleteImage = require("../utils/deletImg");

class CategoryService {
  async getAllcategory(restaurantId) {
    return await categoryRepository.findAllByRestaurant(restaurantId);
  }

  async getCategoryById(categoryId) {
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    return category;
  }

  async addCategory({ restaurantId, name, file }) {
    if (!file) {
      const error = new Error("Category image is required");
      error.statusCode = 400;
      throw error;
    }

    const category = await categoryRepository.create({
      restaurant: restaurantId,
      name,
      image: file.path,
      publicId: file.filename,
    });

    return category;
  }

  async editCategory(categoryId, { name, file }) {
    const category = await categoryRepository.findById(categoryId);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }

    const updateData = {};
    if (name) updateData.name = name;

    if (file) {
      if (category.publicId) {
        await deleteImage(category.publicId);
      }
      updateData.image = file.path;
      updateData.publicId = file.filename;
    }

    return await categoryRepository.update(categoryId, updateData);
  }

  async deletCategory(categoryId, restaurantId) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const foods = await foodRepository.findByCategory(categoryId, session);
      for (const food of foods) {
        await foodService.deletFood(food._id, restaurantId, session);
      }

      const category = await categoryRepository.findById(categoryId, session);
      if (!category) {
        const error = new Error("Category not found");
        error.statusCode = 404;
        throw error;
      }

      await categoryRepository.deleteById(categoryId, session);

      await session.commitTransaction();
      session.endSession();

      if (category.publicId) {
        await deleteImage(category.publicId);
      }

      return true;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}

module.exports = new CategoryService();