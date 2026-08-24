const billService = require("../services/billService");
const { sendBillStatusUpdateNotificationToCustomer } = require("../socket/socketEvent");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.getBillById = async (req, res) => {
  try {
    const { billId } = req.params;
    if (!billId) {
      return sendError(res, 400, "Bill ID is required");
    }

    const bill = await billService.getBillById(billId);

    return sendSuccess(res, 200, "Bill fetched successfully", bill, {
      bill,
    });
  } catch (error) {
    console.error("getBillById error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.BillCashPayment = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    const { billId, tableId } = req.params;
    const { customerId } = req.body;

    if (!restaurant) {
      return sendError(res, 404, "Restaurant not found");
    }

    if (!billId || !tableId) {
      return sendError(res, 400, "Bill ID and Table ID are required");
    }

    const { bill, table } = await billService.cashBillPayment(
      billId,
      tableId,
      restaurant
    );

    if (customerId) {
      sendBillStatusUpdateNotificationToCustomer(
        customerId,
        billId,
        bill.paymentStatus
      );
    }

    return sendSuccess(
      res,
      200,
      "payment is seccessfuly payed",
      { bill, table },
      {
        secces: true,
        data: { bill, table },
      }
    );
  } catch (error) {
    console.error("BillCashPayment error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};