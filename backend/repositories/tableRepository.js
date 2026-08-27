const Table = require("../models/table-model");

class TableRepository {
  async findAllByRestaurant(restaurantId, session = null) {
    const query = Table.find({ restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }

  async findById(id, session = null) {
    const query = Table.findById(id);
    if (session) query.session(session);
    return await query.exec();
  }

  async findByQRCode(qrCodeToken, session = null) {
    const query = Table.findOne({ qrCode: qrCodeToken });
    if (session) query.session(session);
    return await query.exec();
  }

  async create(data, session = null) {
    if (session) {
      const [table] = await Table.create([data], { session });
      return table;
    }
    return await Table.create(data);
  }

  async updateStatus(id, status, customerId = null, session = null) {
    const table = await this.findById(id, session);
    if (!table) return null;

    table.status = status;
    switch (status) {
      case "available":
        table.currentCustomer = null;
        table.activeSince = null;
        break;
      case "active":
        table.currentCustomer = customerId;
        table.activeSince = new Date();
        break;
      case "occupied":
        // Keep customer reference, reset activeSince
        table.activeSince = null;
        break;
    }

    return await table.save({ session });
  }

  async deleteById(id, session = null) {
    const query = Table.findByIdAndDelete(id);
    if (session) query.session(session);
    return await query.exec();
  }
}

module.exports = new TableRepository();
