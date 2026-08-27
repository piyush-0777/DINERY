const Bill = require("../models/bill-model");
const mongoose = require("mongoose");

class BillRepository {
  async create(data, session = null) {
    if (session) {
      const [bill] = await Bill.create([data], { session });
      return bill;
    }
    return await Bill.create(data);
  }

  async findById(id, session = null) {
    const query = Bill.findById(id);
    if (session) query.session(session);
    return await query.exec();
  }

  async findByOrderAndRestaurant(orderId, restaurantId, session = null) {
    const query = Bill.findOne({ order: orderId, restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }

  async findAllByRestaurant(restaurantId, session = null) {
    const query = Bill.find({ restaurant: restaurantId });
    if (session) query.session(session);
    return await query.exec();
  }

  async updatePaymentStatus(id, paymentStatus = "paid", paymentMode = "cash", session = null) {
    const options = { new: true };
    if (session) options.session = session;

    return await Bill.findByIdAndUpdate(
      id,
      {
        $set: {
          paymentStatus,
          paymentMode,
          paymentAt: new Date(),
        },
      },
      options
    );
  }

  async getRevenueAnalytics(restaurantId, { start, end, groupRule }) {
    const data = await Bill.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: start, $lte: end },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: groupRule,
          totalRevenue: { $sum: "$finalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return data.map((d) => ({
      date: d._id,
      totalRevenue: d.totalRevenue,
    }));
  }

  async getCustomerReport(restaurantId, { start, end }) {
    return await Bill.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "order",
          foreignField: "_id",
          as: "order",
        },
      },
      { $unwind: "$order" },
      {
        $lookup: {
          from: "customers",
          localField: "order.customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      {
        $project: {
          name: "$customer.name",
          orderId: "$order._id",
          billPrice: "$finalAmount",
        },
      },
    ]);
  }

  async getDailySaleReport(restaurantId, { start, end }) {
    return await Bill.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: start, $lte: end },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalorder: { $sum: 1 },
          totalrevenu: { $sum: "$finalAmount" },
        },
      },
      {
        $project: {
          date: "$_id",
          totalorder: 1,
          totalrevenu: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);
  }

  async getGSTReport(restaurantId, { start, end }) {
    return await Bill.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: start, $lte: end },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          gst_collected: { $sum: "$tax" },
        },
      },
      {
        $project: {
          month: "$_id",
          gst_collected: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);
  }

  async getMonthlyRevenueReport(restaurantId, { start, end }) {
    return await Bill.aggregate([
      {
        $match: {
          restaurant: new mongoose.Types.ObjectId(restaurantId),
          createdAt: { $gte: start, $lte: end },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalrevenu: { $sum: "$finalAmount" },
        },
      },
      {
        $project: {
          month: "$_id",
          totalrevenu: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);
  }
}

module.exports = new BillRepository();
