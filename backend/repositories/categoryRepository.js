const Category = require("../models/categories-model");

class CategoryRepository {
  async findAllByRestaurant(restaurantId, session = null) {
    const query = Category.find({ restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }

  async findById(id, session = null) {
    const query = Category.findById(id);
    if (session) query.session(session);
    return await query.exec();
  }

  async create(data, session = null) {
    if (session) {
      const [category] = await Category.create([data], { session });
      return category;
    }
    return await Category.create(data);
  }

  async update(id, updateData, session = null) {
    const options = { new: true };
    if (session) options.session = session;
    return await Category.findByIdAndUpdate(id, { $set: updateData }, options);
  }

  async deleteById(id, session = null) {
    const query = Category.findByIdAndDelete(id);
    if (session) query.session(session);
    return await query.exec();
  }
}

module.exports = new CategoryRepository();
