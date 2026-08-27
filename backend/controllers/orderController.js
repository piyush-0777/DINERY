const orderService = require("../services/orderService");
const { sendOrderStatusUpdateNotificationToCustomer } = require("../socket/socketEvent");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.updateOrderStatus = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId || !status) {
      return sendError(res, 400, "Order ID and status are required.");
    }

    const order = await orderService.updateOrderStatus(
      restaurantId,
      orderId,
      status
    );

    if (order.customer) {
      sendOrderStatusUpdateNotificationToCustomer(
        order.customer,
        order._id,
        status
      );
    }

    return sendSuccess(
      res,
      200,
      "Order status updated successfully.",
      order,
      { order }
    );
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    return sendError(res, error.statusCode || 400, error.message || "Status update failed");
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return sendError(res, 400, "Order ID is required");
    }

    const order = await orderService.getOrderById(orderId);

    return sendSuccess(res, 200, "Order fetched successfully", order, {
      order,
    });
  } catch (error) {
    console.error("getOrderById error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};
