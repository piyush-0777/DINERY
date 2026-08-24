const tableService = require("../services/tableService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.getAllTable = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    const tables = await tableService.getAllTable(restaurant);

    return sendSuccess(res, 200, "Tables fetched successfully", tables, {
      tables,
    });
  } catch (error) {
    console.error("getAllTable error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.createTable = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    const { capacity, tableNumber } = req.body;

    if (!restaurant) {
      return sendError(res, 404, "Restaurant not found");
    }

    if (!tableNumber) {
      return sendError(res, 400, "Table number is required");
    }

    const tableData = await tableService.createTable({
      restaurant,
      capacity: Number(capacity) || 2,
      tableNumber: Number(tableNumber),
    });

    return sendSuccess(
      res,
      200,
      "Table is added",
      tableData,
      { table: tableData }
    );
  } catch (error) {
    console.error("createTable error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal server error");
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    const tableId = req.params.tableId;

    if (!restaurant) {
      return sendError(res, 404, "Restaurant not found");
    }

    if (!tableId) {
      return sendError(res, 400, "Table ID is required");
    }

    const deletedTable = await tableService.deleteTable(tableId, restaurant);

    return sendSuccess(
      res,
      200,
      "Table is deleted..",
      deletedTable,
      { table: deletedTable }
    );
  } catch (error) {
    console.error("deleteTable error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal server error");
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    const { status, customer } = req.body;
    const { tableId } = req.params;

    if (!restaurant) {
      return sendError(res, 404, "Restaurant not found");
    }

    if (!tableId || !status) {
      return sendError(res, 400, "Table ID and status are required");
    }

    await tableService.updateTableStatus(tableId, status, customer);
    const tableData = await tableService.getTableById(tableId, restaurant);

    return sendSuccess(
      res,
      200,
      "Table status updated successfully.",
      tableData,
      { table: tableData }
    );
  } catch (error) {
    console.error("updateStatus error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.getTableById = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    const tableId = req.params.tableId;

    if (!restaurant) {
      return sendError(res, 404, "Restaurant not found");
    }

    if (!tableId) {
      return sendError(res, 400, "Table ID is required");
    }

    const table = await tableService.getTableById(tableId, restaurant);

    return sendSuccess(res, 200, "Table fetched successfully", table, {
      table,
    });
  } catch (error) {
    console.error("getTableById error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal server error");
  }
};