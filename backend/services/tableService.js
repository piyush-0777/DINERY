const tableRepository = require("../repositories/tableRepository");
const customerRepository = require("../repositories/customerRepository");
const orderRepository = require("../repositories/orderRepository");
const generateQR = require("../utils/generateQR");
const crypto = require("crypto");

class TableService {
  async getTableById(tableId, restaurant) {
    const table = await tableRepository.findById(tableId);
    if (!table) {
      const error = new Error("Table not found");
      error.statusCode = 404;
      throw error;
    }

    const qrImage = await generateQR(table, restaurant.restaurantName);

    const tableData = {
      ...table.toObject(),
      qrImage,
    };

    if (table.status === "active" || table.status === "occupied") {
      if (table.currentCustomer) {
        tableData.customer = await customerRepository.findById(table.currentCustomer);
      }
    }

    if (table.status === "occupied" && table.currentCustomer) {
      tableData.order = await orderRepository.findCustomerOrderByTable(
        table.currentCustomer,
        table._id
      );
    }

    return tableData;
  }

  async createTable({ restaurant, capacity, tableNumber }) {
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const table = await tableRepository.create({
      restaurant: restaurant._id,
      tableId: tableNumber,
      capacity: capacity || 2,
      qrCode: crypto.randomUUID(),
    });

    const qrImage = await generateQR(table, restaurant.restaurantName);
    return {
      ...table.toObject(),
      qrImage,
    };
  }

  async deleteTable(tableId, restaurant) {
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const table = await tableRepository.findById(tableId);
    if (!table) {
      const error = new Error("Table not found");
      error.statusCode = 404;
      throw error;
    }

    if (table.status !== "available") {
      const error = new Error("Table cannot be deleted while occupied or active");
      error.statusCode = 400;
      throw error;
    }

    await tableRepository.deleteById(tableId);
    return table;
  }

  async updateTableStatus(tableId, status, customerId = null) {
    const validStatuses = ["available", "active", "occupied"];
    if (!validStatuses.includes(status)) {
      const error = new Error("Invalid table status");
      error.statusCode = 400;
      throw error;
    }

    const table = await tableRepository.updateStatus(tableId, status, customerId);
    if (!table) {
      const error = new Error("Table not found");
      error.statusCode = 404;
      throw error;
    }

    return table;
  }

  async getAllTable(restaurant) {
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const tables = await tableRepository.findAllByRestaurant(restaurant._id);
    const tablesWithDetails = [];

    for (const table of tables) {
      const qrImage = await generateQR(table, restaurant.restaurantName);

      const tableData = {
        ...table.toObject(),
        qrImage,
      };

      if (table.status === "active" || table.status === "occupied") {
        if (table.currentCustomer) {
          tableData.customer = await customerRepository.findById(table.currentCustomer);
        }
      }

      if (table.status === "occupied" && table.currentCustomer) {
        tableData.order = await orderRepository.findCustomerOrderByTable(
          table.currentCustomer,
          table._id
        );
      }

      tablesWithDetails.push(tableData);
    }

    return tablesWithDetails;
  }
}

module.exports = new TableService();
