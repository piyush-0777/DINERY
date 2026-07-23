const mongoose = require("mongoose");
const Order = require('../models/order-model')
const Bill = require('../models/bill-model')


function getDateRange({ type, year, month }) {
  const now = new Date();

  let start, end;

  if (type === "week") {
    end = new Date(now);

    start = new Date(now);
    start.setDate(now.getDate() - 6); // Last 7 days (including today)
    start.setHours(0, 0, 0, 0);

    end.setHours(23, 59, 59, 999);
  }

  if (type === "month") {
    year = parseInt(year) || now.getFullYear();
    month = parseInt(month) || now.getMonth() + 1;

    start = new Date(year, month - 1, 1);

    if (year === now.getFullYear() && month === now.getMonth() + 1) {
      end = new Date(now);
    } else {
      end = new Date(year, month, 0, 23, 59, 59, 999);
    }
  }

  if (type === "year") {
    year = parseInt(year) || now.getFullYear();

    start = new Date(year, 0, 1);

    if (year === now.getFullYear()) {
      end = new Date(now);
    } else {
      end = new Date(year, 11, 31, 23, 59, 59, 999);
    }
  }

  return { start, end };
}

exports.ordersAnalytics = async ({
  restaurantId,
  type,
  year,
  month,
  week,
}) => {

  const { start, end } = getDateRange({
    type,
    year,
    month,
  });
  console.log( restaurantId,
  type,
  year,
  month,
  week)

  let group;

  if (type === "week") group = { $dayOfWeek: "$createdAt" };

  if (type === "month") group = {
    $ceil: { $divide: [{ $dayOfMonth: "$createdAt" }, 7] },
  };

  if (type === "year") group = { $month: "$createdAt" };

  const data = await Order.aggregate([
    {
      $match: {
        restaurant: restaurantId,
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: group,
        totalOrder: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return data.map((d) => ({
    date: d._id,
    totalOrder: d.totalOrder,
  }));
};


exports.revenueAnalytics = async ({
  restaurantId,
  type,
  year,
  month,
  week,
}) => {

  const { start, end } = getDateRange({
    type,
    year,
    month,
  });

  let group;

  if (type === "week") group = { $dayOfWeek: "$createdAt" };

  if (type === "month")
    group = {
      $ceil: { $divide: [{ $dayOfMonth: "$createdAt" }, 7] },
    };

  if (type === "year") group = { $month: "$createdAt" };

  const data = await Bill.aggregate([
    {
      $match: {
        restaurant: restaurantId,
        createdAt: { $gte: start, $lte: end },
        paymentStatus: "paid",
      },
    },
    {
      $group: {
        _id: group,
        totalRevenue: { $sum: "$finalAmount" },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return data.map((d) => ({
    date: d._id,
    totalRevenue: d.totalRevenue,
  }));
};


exports.topItemsAnalytics = async ({
  restaurantId,
  type,
  year,
  month,
  week,
}) => {

  const { start, end } = getDateRange({
    type,
    year,
    month,
  });
  console.log(start , end , 'date');

  const data = await Order.aggregate([
    {
      $match: {
        restaurant: restaurantId,
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

    { $limit: 10 },
  ]);

  return data.map((d) => ({
    name: d._id,
    sales: d.sales,
  }));
};