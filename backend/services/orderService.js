const mongoose = require("../config/mongoDB-connection");
const orderRepository = require("../repositories/orderRepository");
const tableRepository = require("../repositories/tableRepository");
const billRepository = require("../repositories/billRepository");
const restaurantRepository = require("../repositories/restaurantRepository");
const { sendNewOrderNotification } = require("../socket/socketEvent");

const VALID_ORDER_STATUS = [
  "pending",
  "preparing",
  "served",
  "completed",
  "cancelled",
];

class OrderService {
  async customerPlaceOrder({ restaurantName, token, body }) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const { orders, customer } = body;

      const cleanToken = token ? token.trim() : "";
      const table = await tableRepository.findByQRCode(cleanToken, session);
      if (!table) {
        throw new Error("Table not found");
      }

      const restaurant = await restaurantRepository.findByName(restaurantName, session);
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      let totalAmount = 0;
      orders.items.forEach((item) => {
        totalAmount += item.subtotal;
      });

      const createdOrder = await orderRepository.create(
        {
          restaurant: restaurant._id,
          customer: customer._id,
          table: table._id,
          items: orders.items,
          totalAmount,
          status: "pending",
        },
        session
      );

      const createdBill = await billRepository.create(
        {
          restaurant: restaurant._id,
          order: createdOrder._id,
          billAmount: totalAmount,
          tax: 5,
          finalAmount: totalAmount * 1.05,
          paymentStatus: "unpaid",
        },
        session
      );

      // Update table status to occupied
      await tableRepository.updateStatus(table._id, "occupied", customer._id, session);

      await session.commitTransaction();
      session.endSession();

      // Send socket notification after successful commit
      await sendNewOrderNotification(
        restaurant._id,
        createdOrder,
        createdBill,
        table._id
      );

      return {
        order: createdOrder,
        bill: createdBill,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async updateOrderStatus(restaurantId, orderId, status) {
    if (!restaurantId) {
      const error = new Error("Restaurant not found.");
      error.statusCode = 404;
      throw error;
    }

    if (!status) {
      const error = new Error("Status is required.");
      error.statusCode = 400;
      throw error;
    }

    if (!VALID_ORDER_STATUS.includes(status)) {
      const error = new Error("Invalid order status.");
      error.statusCode = 400;
      throw error;
    }

    const order = await orderRepository.findById(orderId, false);
    if (!order) {
      const error = new Error("Order not found.");
      error.statusCode = 404;
      throw error;
    }

    if (order.restaurant.toString() !== restaurantId.toString()) {
      const error = new Error("Unauthorized to update this order.");
      error.statusCode = 403;
      throw error;
    }

    const updatedOrder = await orderRepository.updateStatus(orderId, status);
    return updatedOrder;
  }

  async getOrderById(orderId) {
    const order = await orderRepository.findById(orderId, true);
    if (!order) {
      const error = new Error("Order not found");
      error.statusCode = 404;
      throw error;
    }
    return order;
  }

  async getTodayOrder(restaurantId) {
    if (!restaurantId) {
      const error = new Error("Restaurant not found.");
      error.statusCode = 404;
      throw error;
    }
    return await orderRepository.findTodayOrders(restaurantId);
  }

  async getLast7DaysOrders(restaurantId) {
    return await orderRepository.getLast7DaysOrders(restaurantId);
  }
}

module.exports = new OrderService();