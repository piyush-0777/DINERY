const Food = require("../models/food-model");

class FoodRepository {
  async findAllByRestaurant(restaurantId, session = null) {
    const query = Food.find({ restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }

  async findById(id, session = null) {
    const query = Food.findById(id);
    if (session) query.session(session);
    return await query.exec();
  }

  async findByCategory(categoryId, session = null) {
    const query = Food.find({ category: categoryId });
    if (session) query.session(session);
    return await query.exec();
  }

  async create(data, session = null) {
    if (session) {
      const [food] = await Food.create([data], { session });
      return food;
    }
    return await Food.create(data);
  }

  async update(id, updateData, session = null) {
    const options = { new: true, runValidators: true };
    if (session) options.session = session;
    return await Food.findByIdAndUpdate(id, { $set: updateData }, options);
  }

  async toggleAvailability(id, session = null) {
    const food = await this.findById(id, session);
    if (!food) return null;

    food.isAvailable = !food.isAvailable;
    return await food.save({ session });
  }

  async deleteById(id, session = null) {
    const query = Food.findByIdAndDelete(id);
    if (session) query.session(session);
    return await query.exec();
  }

  async deleteManyByCategory(categoryId, restaurantId, session = null) {
    const query = Food.deleteMany({ category: categoryId, restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }
}

module.exports = new FoodRepository();
