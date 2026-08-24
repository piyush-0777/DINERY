const Customer = require("../models/customer-model");

class CustomerRepository {
  async create(data, session = null) {
    if (session) {
      const [customer] = await Customer.create([data], { session });
      return customer;
    }
    return await Customer.create(data);
  }

  async findById(id, session = null) {
    const query = Customer.findById(id);
    if (session) query.session(session);
    return await query.exec();
  }

  async findByRestaurant(restaurantId, session = null) {
    const query = Customer.find({ restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }
}

module.exports = new CustomerRepository();
