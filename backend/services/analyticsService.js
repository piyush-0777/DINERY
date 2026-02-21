const mongoose = require("mongoose");
const orderModel = require('../models/order-model')
const billModel = require('../models/bill-model')

/* =========================================
   HELPER: Date Filter Builder
========================================= */
const buildDateFilter = (startDate, endDate) => {
  const filter = {};
  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  return filter;
};

/* =========================================
   1️⃣ DAILY SALES REPORT
========================================= */
exports.getDailySalesReport = async (restaurantId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate);

  return await billModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        paymentStatus: "paid",
        ...dateFilter
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        totalSales: { $sum: "$finalAmount" },
        totalTax: { $sum: "$tax" },
        totalBills: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

/* =========================================
   2️⃣ MONTHLY REVENUE REPORT
========================================= */
exports.getMonthlyRevenueReport = async (restaurantId) => {
  return await billModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        paymentStatus: "paid"
      }
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" }
        },
        revenue: { $sum: "$finalAmount" }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);
};

/* =========================================
   3️⃣ GST / TAX REPORT
========================================= */
exports.getTaxReport = async (restaurantId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate);

  return await billModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        paymentStatus: "paid",
        ...dateFilter
      }
    },
    {
      $group: {
        _id: null,
        totalTaxCollected: { $sum: "$tax" },
        totalRevenue: { $sum: "$finalAmount" }
      }
    }
  ]);
};

/* =========================================
   4️⃣ STAFF PERFORMANCE REPORT
   (Based on order count)
========================================= */
exports.getStaffPerformanceReport = async (restaurantId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate);

  return await orderModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        status: "completed",
        ...dateFilter
      }
    },
    {
      $lookup: {
        from: "tables",
        localField: "table",
        foreignField: "_id",
        as: "tableInfo"
      }
    },
    {
      $group: {
        _id: "$table",
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$totalAmount" }
      }
    }
  ]);
};

/* =========================================
   5️⃣ CANCELLED ORDERS REPORT
========================================= */
exports.getCancelledOrdersReport = async (restaurantId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate);

  return await orderModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        status: "cancelled",
        ...dateFilter
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        cancelledOrders: { $sum: 1 },
        lostRevenue: { $sum: "$totalAmount" }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

/* =========================================
   6️⃣ ANALYTICS: TOP SELLING ITEMS
========================================= */
exports.getTopSellingItems = async (restaurantId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate);

  return await orderModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        status: "completed",
        ...dateFilter
      }
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.subtotal" }
      }
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 }
  ]);
};

/* =========================================
   7️⃣ ANALYTICS: PEAK HOURS
========================================= */
exports.getPeakHours = async (restaurantId, startDate, endDate) => {
  const dateFilter = buildDateFilter(startDate, endDate);

  return await orderModel.aggregate([
    {
      $match: {
        restaurant: new mongoose.Types.ObjectId(restaurantId),
        status: "completed",
        ...dateFilter
      }
    },
    {
      $group: {
        _id: { $hour: "$createdAt" },
        totalOrders: { $sum: 1 }
      }
    },
    { $sort: { totalOrders: -1 } }
  ]);
};