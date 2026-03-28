const mongoose = require("mongoose");
const Order = require('../models/order-model')
const Bill = require('../models/bill-model')


function getDateRange({ type, year, month, week }) {

  const now = new Date();

  year = parseInt(year) || now.getFullYear();
  month = parseInt(month);
  week = parseInt(week);

  let start, end;

  if (type === "year") {

    start = new Date(year, 0, 1);
    end = year === now.getFullYear() ? now : new Date(year, 11, 31);

  }

  if (type === "month") {

    start = new Date(year, month - 1, 1);
    end =
      year === now.getFullYear() && month === now.getMonth() + 1
        ? now
        : new Date(year, month, 0);

  }

  if (type === "week") {

    const firstDay = new Date(year, month - 1, 1);

    const startDay = (week - 1) * 7 + 1;
    const endDay = startDay + 6;

    start = new Date(year, month - 1, startDay);
    end = new Date(year, month - 1, endDay);

    if (end > now) end = now;
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
    week,
  });

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
    week,
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
    week,
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