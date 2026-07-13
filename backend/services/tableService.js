const tableModel = require('../models/table-model')
const customerModel = require("../models/customer-model");
const orderModel = require("../models/order-model");
const generateQR = require("../utils/generateQR");

const getTableById = async(tableId) =>{
    try {
        const table = await tableModel.findById(tableId)
         const qrImage = await generateQR(table, restaurant.restaurantName);

        const tableData = {
            ...table.toObject(),
            qrImage,
        };

        if (
            table.status === "active" ||
            table.status === "occupied"
        ) {
            tableData.customer = await customerModel.findById(
                table.currentCustomer
            );
        }

        if (table.status === "occupied") {
            tableData.order = await orderModel
                .findOne({
                    customer: table.currentCustomer,
                })
                .sort({ createdAt: -1 });
        }
        return tableData;
    } catch (error) {
        throw new Error(error)
    }
}

const updateTableStatus = async (tableId, status, customerId = null) => {
    try {
        const validStatuses = ["available", "active", "occupied"];
        if (!validStatuses.includes(status)) {
            throw new Error("Invalid table status");
        }

        const table = await tableModel.findById(tableId);

        if (!table) {
            throw new Error("Table not found");
        }

        table.status = status;

        switch (status) {
            case "available":
                table.currentCustomer = null;
                table.activeSince = null;
                break;

            case "active":
                table.currentCustomer = customerId;
                table.activeSince = new Date();
                break;

            case "occupied":
                // Keep the same customer
                table.activeSince = null;
                break;
        }

        await table.save();

        return table;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllTable = async (restaurant) =>{
     if (!restaurant) {
        throw new Error("Restaurant not found");
    }

    const tables = await tableModel.find({
        restaurant: restaurant._id,
    });

    const tablesWithDetails = [];

    for (const table of tables) {
        const qrImage = await generateQR(table, restaurant.restaurantName);

        const tableData = {
            ...table.toObject(),
            qrImage,
        };

        if (
            table.status === "active" ||
            table.status === "occupied"
        ) {
            tableData.customer = await customerModel.findById(
                table.currentCustomer
            );
        }

        if (table.status === "occupied") {
            tableData.order = await orderModel
                .findOne({
                    customer: table.currentCustomer,
                })
                .sort({ createdAt: -1 });
        }

        tablesWithDetails.push(tableData);
    }

    return tablesWithDetails;
}



module.exports = {
    getTableById,
    updateTableStatus,
    getAllTable
};

