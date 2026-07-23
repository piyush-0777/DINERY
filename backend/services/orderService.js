const mongoose = require("mongoose");

const orderModel = require("../models/order-model");
const tableModel = require("../models/table-model");
const billModel = require("../models/bill-model");
const restaurantModel = require("../models/restaurant-model");

const { sendNewOrderNotification } = require("../socket/socketEvent");

exports.customerPlaceOrder = async ({
    restaurantName,
    token,
    body,
}) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { orders, customer } = body;

        const table = await tableModel.findOne({
            qrCode: token,
        }).session(session);

        if (!table) {
            throw new Error("Table not found");
        }

        const restaurant = await restaurantModel.findOne({
            restaurantName,
        }).session(session);

        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        let totalAmount = 0;

        orders.items.forEach((item) => {
            totalAmount += item.subtotal;
        });

        const createdOrder = await orderModel.create(
            [
                {
                    restaurant: restaurant._id,
                    customer: customer._id,
                    table: table._id,
                    items: orders.items,
                    totalAmount,
                    orderStatus: "confirmed",
                },
            ],
            { session }
        );

        const bill = await billModel.create(
            [
                {
                    restaurant: restaurant._id,
                    order: createdOrder[0]._id,
                    billAmount: totalAmount,
                    tax: 5,
                    finalAmount: totalAmount * 1.05,
                    paymentStatus: "unpaid",
                },
            ],
            { session }
        );

        // Update table status
        table.status = "occupied";
        await table.save({ session });

        await session.commitTransaction();
        session.endSession();

        // Send socket notification after successful commit
        await sendNewOrderNotification(
            restaurant._id,
            createdOrder[0],
            bill[0] , 
            table._id
        );

        return {
            order: createdOrder[0],
            bill: bill[0],
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;
    }
};


const VALID_ORDER_STATUS = [
  "pending",
  "preparing",
  "served",
  "completed",
  "cancelled",
];

exports.updateOrderStatus = async (restaurantId, orderId, status) => {
  if (!restaurantId) {
    throw new Error("Restaurant not found.");
  }

  if (!status) {
    throw new Error("Status is required.");
  }

  if (!VALID_ORDER_STATUS.includes(status)) {
    throw new Error("Invalid order status.");
  }

  const order = await orderModel.findById(orderId);

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.restaurant.toString() !== restaurantId.toString()) {
    throw new Error("Unauthorized to update this order.");
  }

  order.status = status;
  await order.save();

  return order;
};

exports.getTodayOrder = async (restaurantId) => {
    if (!restaurantId) {
    throw new Error("Restaurant not found.");
  }

  const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

const endOfDay = new Date();
endOfDay.setHours(23, 59, 59, 999);

const todayOrders = await orderModel.find({
    restaurant:restaurantId ,
  createdAt: {
    $gte: startOfDay,
    $lte: endOfDay,
  },
})
 .populate('table')
    .populate('customer')
  return todayOrders
  
 
}


exports.getLast7DaysOrders = async (resID) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  const data = await orderModel.aggregate([
    {
      $match: {
        restaurant: resID,
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
            timezone: "Asia/Kolkata", // Use your timezone
          },
        },
        orders: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const key = date.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    }); // YYYY-MM-DD

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
};