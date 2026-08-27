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

  async findAll(session = null) {
    const query = Restaurant.find().select("-password").sort({ createdAt: -1 });
    if (session) query.session(session);
    return await query.exec();
  }

  async count(filter = {}, session = null) {
    const query = Restaurant.countDocuments(filter);
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

  async updateRole(id, role, session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      { $set: { role } },
      options
    );
  }

  async updatePlan(id, plan, isPremium = false, session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      {
        $set: {
          plan,
          isPremium,
          premiumActivatedAt: isPremium ? new Date() : null,
        },
      },
      options
    );
  }

  async grantSubscription(id, { currentPlan, subscriptionExpiresAt, subscriptionStatus = "active" }, session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      {
        $set: {
          isPremium: true,
          plan: "premium",
          currentPlan,
          subscriptionStatus,
          subscriptionExpiresAt,
          premiumActivatedAt: new Date(),
        },
      },
      options
    );
  }

  async updateSubscriptionDetails(id, updateData, session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      { $set: updateData },
      options
    );
  }

  async updateCurrencyPreference(id, currencyPreference, session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      { $set: { currencyPreference } },
      options
    );
  }

  async revokeSubscription(id, session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Restaurant.findByIdAndUpdate(
      id,
      {
        $set: {
          isPremium: false,
          plan: "free",
          currentPlan: "free",
          subscriptionStatus: "expired",
          subscriptionExpiresAt: new Date(Date.now() - 1000),
          trialExpiresAt: new Date(Date.now() - 1000),
        },
      },
      options
    );
  }
}

module.exports = new RestaurantRepository();
