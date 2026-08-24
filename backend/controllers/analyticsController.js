const analyticsService = require("../services/analyticsService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.getOrdersAnalytics = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    const { type, year, month, week } = req.query;

    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    const data = await analyticsService.ordersAnalytics({
      restaurantId,
      type,
      year,
      month,
      week,
    });

    return sendSuccess(res, 200, "Order analytics fetched successfully", data, {
      data,
    });
  } catch (err) {
    console.error("getOrdersAnalytics error:", err);
    return sendError(res, err.statusCode || 500, err.message || "Failed to fetch order analytics");
  }
};

exports.getRevenueTrend = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    const { type, year, month, week } = req.query;

    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    const data = await analyticsService.revenueAnalytics({
      restaurantId,
      type,
      year,
      month,
      week,
    });

    return sendSuccess(res, 200, "Revenue analytics fetched successfully", data, {
      data,
    });
  } catch (err) {
    console.error("getRevenueTrend error:", err);
    return sendError(res, err.statusCode || 500, err.message || "Failed to fetch revenue analytics");
  }
};

exports.getTopSellingItems = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    const { type, year, month, week } = req.query;

    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    const data = await analyticsService.topItemsAnalytics({
      restaurantId,
      type,
      year,
      month,
      week,
    });

    return sendSuccess(res, 200, "Top items analytics fetched successfully", data, {
      data,
    });
  } catch (err) {
    console.error("getTopSellingItems error:", err);
    return sendError(res, err.statusCode || 500, err.message || "Failed to fetch top items analytics");
  }
};