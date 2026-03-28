const Order = require("../models/order-model");
const Bill = require("../models/bill-model");
const Customer = require("../models/customer-model");
const mongoose = require("mongoose");


// helper dates
const getLast7Days = () => {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 7);

  return { today, past };
};

const getYearDates = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31);

  return { start, end };
};



// =========================
// 1. Customer report (7 days)
// =========================

exports.getCustomerReportService = async (restaurantId) => {
  const { today, past } = getLast7Days();

  const data = await Bill.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        createdAt: { $gte: past, $lte: today }
      }
    },
    {
      $lookup: {
        from: "orders",
        localField: "order",
        foreignField: "_id",
        as: "order"
      }
    },
    { $unwind: "$order" },

    {
      $lookup: {
        from: "customers",
        localField: "order.customer",
        foreignField: "_id",
        as: "customer"
      }
    },
    { $unwind: "$customer" },

    {
      $project: {
        name: "$customer.name",
        orderId: "$order._id",
        billPrice: "$finalAmount"
      }
    }
  ]);

  return data;
};



// =========================
// 2. Daily Sale report (7 days)
// =========================

exports.getDailySaleReportService = async (restaurantId) => {
  const { today, past } = getLast7Days();

  const data = await Bill.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        createdAt: { $gte: past, $lte: today },
        paymentStatus: "paid"
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        totalorder: { $sum: 1 },
        totalrevenu: { $sum: "$finalAmount" }
      }
    },
    {
      $project: {
        date: "$_id",
        totalorder: 1,
        totalrevenu: 1,
        _id: 0
      }
    },
    { $sort: { date: 1 } }
  ]);

  return data;
};



// =========================
// 3. GST Report (current year)
// =========================

exports.getGSTReportService = async (restaurantId) => {
  const { start, end } = getYearDates();

  const data = await Bill.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        createdAt: { $gte: start, $lte: end },
        paymentStatus: "paid"
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        gst_collected: { $sum: "$tax" }
      }
    },
    {
      $project: {
        month: "$_id",
        gst_collected: 1,
        _id: 0
      }
    },
    { $sort: { month: 1 } }
  ]);

  return data;
};



// =========================
// 4. Monthly revenue report
// =========================

exports.getMonthlyRevenueReportService = async (restaurantId) => {
  const { start, end } = getYearDates();

  const data = await Bill.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        createdAt: { $gte: start, $lte: end },
        paymentStatus: "paid"
      }
    },
    {
      $group: {
        _id: { $month: "$createdAt" },
        totalrevenu: { $sum: "$finalAmount" }
      }
    },
    {
      $project: {
        month: "$_id",
        totalrevenu: 1,
        _id: 0
      }
    },
    { $sort: { month: 1 } }
  ]);

  return data;
};