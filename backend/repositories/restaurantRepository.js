const Restaurant = require("../models/restaurant-model");

class RestaurantRepository {
  async findByEmail(ownerEmail, session = null) {
    const query = Restaurant.findOne({ ownerEmail });
    if (session) query.session(session);
    return await query.exec();
  }

  async findByName(restaurantName, session = null) {
    const query = Restaurant.findOne({ restaurantName });
    if (session) query.session(session);
    return await query.exec();
  }

  async findById(id, session = null) {
    const query = Restaurant.findById(id);
    if (session) query.session(session);
    return await query.exec();
  }

  async create(data, session = null) {
    if (session) {
      const [restaurant] = await Restaurant.create([data], { session });
      return restaurant;
    }
    return await Restaurant.create(data);
  }

  async updateProfile(id, { restaurantName, address, profileImg, publicId }, session = null) {
    const updateData = { restaurantName, address };
    if (profileImg) updateData.profileImg = profileImg;
    if (publicId) updateData.publicId = publicId;

    const options = { new: true, runValidators: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(id, { $set: updateData }, options);
  }

  async updateOwnerInfo(id, { ownerName, ownerPhone, ownerEmail }, session = null) {
    const options = { new: true, runValidators: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      { $set: { ownerName, ownerPhone, ownerEmail } },
      options
    );
  }

  async updateGSTNumber(id, gstNumber, session = null) {
    const options = { new: true, runValidators: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      { $set: { gstNumber } },
      options
    );
  }

  async updatePassword(id, hashedPassword, session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      options
    );
  }
}

module.exports = new RestaurantRepository();
