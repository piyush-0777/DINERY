const Order = require("../models/order-model");
const mongoose = require("mongoose");

class OrderRepository {
  async create(data, session = null) {
    if (session) {
      const [order] = await Order.create([data], { session });
      return order;
    }
    return await Order.create(data);
  }

  async findById(id, populateFields = true, session = null) {
    let query = Order.findById(id);
    if (populateFields) {
      query = query.populate("table").populate("customer");
    }
    if (session) query.session(session);
    return await query.exec();
  }

  async findCustomerOrderByTable(customerId, tableId, session = null) {
    const query = Order.findOne({ customer: customerId, table: tableId }).sort({ createdAt: -1 });
    if (session) query.session(session);
    return await query.exec();
  }

  async updateStatus(id, status, session = null) {
    const options = { new: true };
    if (session) options.session = session;
    return await Order.findByIdAndUpdate(id, { $set: { status } }, options);
  }

  async findTodayOrders(restaurantId, session = null) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const query = Order.find({
      restaurant: restaurantId,
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("table")
      .populate("customer");

    if (session) query.session(session);
    return await query.exec();
  }

  async getLast7DaysOrders(restaurantId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const data = await Order.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          status: { $ne: "cancelled" },
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Kolkata",
            },
          },
          orders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const key = date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });

      const found = data.find((d) => d._id === key);

      result.push({
        day: date.toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "Asia/Kolkata",
        }),
        orders: found ? found.orders : 0,
      });
    }

    return result;
  }

  async getOrdersAnalytics(restaurantId, { start, end, groupRule }) {
    const data = await Order.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: groupRule,
          totalOrder: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return data.map((d) => ({
      date: d._id,
      totalOrder: d.totalOrder,
    }));
  }

  async getTopSellingItems(restaurantId, { start, end, limit = 10 }) {
    const data = await Order.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: start, $lte: end },
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          sales: { $sum: "$items.quantity" },
        },
      },
      { $sort: { sales: -1 } },
      { $limit: limit },
    ]);

    return data.map((d) => ({
      name: d._id,
      sales: d.sales,
    }));
  }
}

module.exports = new OrderRepository();
