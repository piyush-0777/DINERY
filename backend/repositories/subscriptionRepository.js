const Subscription = require("../models/subscription-model");

class SubscriptionRepository {
  async findByRestaurant(restaurantId, session = null) {
    const query = Subscription.findOne({ restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }

  async create(data, session = null) {
    if (session) {
      const [subscription] = await Subscription.create([data], { session });
      return subscription;
    }
    return await Subscription.create(data);
  }

  async update(id, updateData, session = null) {
    const options = { new: true };
    if (session) options.session = session;
    return await Subscription.findByIdAndUpdate(id, { $set: updateData }, options);
  }
}

module.exports = new SubscriptionRepository();
