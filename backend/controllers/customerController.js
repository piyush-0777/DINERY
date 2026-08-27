const customerService = require("../services/customerService");
const tableService = require("../services/tableService");
const orderService = require("../services/orderService");
const { sendTableUpdateNotification } = require("../socket/socketEvent");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.customerLogin = async (req, res) => {
  try {
    const { name, phone, token } = req.body;
    const { restaurantName } = req.params;

    if (!token) {
      return sendError(res, 401, "Token is not provided.");
    }

    if (!name?.trim() || !phone?.trim()) {
      return sendError(res, 400, "Name and phone number are required.");
    }

    const loginCustomer = await customerService.loginCustomer(
      restaurantName,
      token,
      name.trim(),
      phone.trim()
    );

    if (!loginCustomer.success) {
      if (loginCustomer.tableStatus === "active") {
        return sendError(
          res,
          409,
          "A customer is already using this table.",
          "Table is active",
          { tableStatus: "active" }
        );
      }

      if (loginCustomer.tableStatus === "occupied") {
        return sendError(
          res,
          409,
          "An order has already been placed for this table.",
          "Table is occupied",
          { tableStatus: "occupied" }
        );
      }
    }

    await tableService.updateTableStatus(
      loginCustomer.table,
      "active",
      loginCustomer.customer._id
    );

    sendTableUpdateNotification(
      loginCustomer.restaurant,
      loginCustomer.table
    );

    return sendSuccess(
      res,
      200,
      "Customer logged in successfully.",
      loginCustomer.customer,
      {
        tableStatus: "active",
        data: loginCustomer.customer,
        token: loginCustomer.token,
      }
    );
  } catch (error) {
    console.error("customerLogin error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.loadCustomerDashbord = async (req, res) => {
  try {
    const { restaurantName } = req.params;
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.cookies?.token ||
      req.body?.token;

    if (!token) {
      return sendError(res, 401, "Token is not provided");
    }

    if (!restaurantName) {
      return sendError(res, 400, "Restaurant name is not provided");
    }

    const customerDashboardData = await customerService.LoadDashbord(
      token,
      restaurantName
    );

    if (!customerDashboardData.success) {
      return sendError(
        res,
        409,
        "Table is currently available. Please activate the table first.",
        "Table is available",
        { tableStatus: "available" }
      );
    }

    return sendSuccess(
      res,
      200,
      "Dashboard loaded successfully",
      customerDashboardData,
      customerDashboardData
    );
  } catch (error) {
    console.error("loadCustomerDashbord error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.customerPlaceOrder = async (req, res) => {
  try {
    const { restaurantName } = req.params;
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.cookies?.token ||
      req.body?.token;

    if (!token) {
      return sendError(res, 401, "Token is not provided");
    }

    if (!restaurantName) {
      return sendError(res, 400, "Restaurant name is required");
    }

    const result = await orderService.customerPlaceOrder({
      restaurantName,
      token,
      body: req.body,
    });

    return sendSuccess(
      res,
      201,
      "Order placed successfully",
      result,
      { data: result }
    );
  } catch (error) {
    console.error("customerPlaceOrder error:", error);
    return sendError(res, error.statusCode || 400, error.message || "Order placement failed");
  }
};