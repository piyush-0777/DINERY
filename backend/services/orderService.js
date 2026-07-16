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