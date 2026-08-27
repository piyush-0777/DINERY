const reportService = require("../services/reportService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.getCustomerReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    const data = await reportService.getCustomerReportService(restaurantId);

    return sendSuccess(res, 200, "Customer report fetched successfully", data, {
      data,
    });
  } catch (err) {
    console.error("getCustomerReport error:", err);
    return sendError(res, err.statusCode || 500, err.message || "Failed to fetch customer report");
  }
};

exports.getDailySaleReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    const data = await reportService.getDailySaleReportService(restaurantId);

    return sendSuccess(res, 200, "Daily sale report fetched successfully", data, {
      data,
    });
  } catch (err) {
    console.error("getDailySaleReport error:", err);
    return sendError(res, err.statusCode || 500, err.message || "Failed to fetch daily sale report");
  }
};

exports.getGSTReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    const data = await reportService.getGSTReportService(restaurantId);

    return sendSuccess(res, 200, "GST report fetched successfully", data, {
      data,
    });
  } catch (err) {
    console.error("getGSTReport error:", err);
    return sendError(res, err.statusCode || 500, err.message || "Failed to fetch GST report");
  }
};

exports.getMonthlyRevenueReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    const data = await reportService.getMonthlyRevenueReportService(restaurantId);

    return sendSuccess(res, 200, "Monthly revenue report fetched successfully", data, {
      data,
    });
  } catch (err) {
    console.error("getMonthlyRevenueReport error:", err);
    return sendError(res, err.statusCode || 500, err.message || "Failed to fetch monthly revenue report");
  }
};