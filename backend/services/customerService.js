const mongoose = require("../config/mongoDB-connection");
const restaurantModel = require("../models/restaurant-model");
const tableModel = require("../models/table-model");
const customerModel = require("../models/customer-model");
const foodModel = require('../models/food-model')
const categoryModel = require('../models/categories-model');
const orderModel = require("../models/order-model");
const billModel = require("../models/bill-model");

const loginCustomer = async (restaurantName, token, name, phone) => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        const restaurant = await restaurantModel.findOne(
            { restaurantName },
            null,
            { session }
        );

        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        const cleanToken = token.trim();
        console.log(`"${cleanToken}"`)
        const table = await tableModel.findOne(
            { qrCode: cleanToken },
            null,
            { session }
        );

        if (!table) {
            throw new Error("Table not found");
        }

        // Customer already logged in
        if (table.status === "active") {
            await session.abortTransaction();
            return {
                success: false,
                tableStatus: "active"
            };
        }

        // Order already placed
        if (table.status === "occupied") {
            await session.abortTransaction();
            return {
                success: false,
                tableStatus: "occupied"
            };
        }

        // AVAILABLE -> ACTIVE

        const [newCustomer] = await customerModel.create(
            [
                {
                    restaurant: restaurant._id,
                    name,
                    phone,
                    table: table._id,
                },
            ],
            { session }
        );

        await session.commitTransaction();

        return {
            success: true,
            tableStatus: "available",
            restaurant: restaurant._id,
            table: table._id,
            customer: newCustomer,
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const LoadDashbord = async (token, restaurantName) => {

    const restaurant = await restaurantModel.findOne({ restaurantName });

    if (!restaurant) {
        throw new Error("Restaurant not found");
    }


    const cleanToken = token.trim();

    const table = await tableModel.findOne({ qrCode: cleanToken });

    if (!table) {
        throw new Error("Table not found");
    }
    if (table.status == "available") {
        return {
            success: false,
            tableStatus: "available"
        };
    }
    const food = await foodModel.find({ restaurant: restaurant._id })
    const category = await categoryModel.find({ restaurant: restaurant._id })
    const customer = await customerModel.findById(table.currentCustomer)
    if (table.status === "active") {
        return {
            success: true,
            tableStatus: "active",
            restaurant: restaurant._id,
            table: table._id,
            customer,
            food,
            category,
        };
    }

    if (table.status === "occupied") {
        const order = await orderModel.findOne({
            customer: customer._id,
            table: table._id,
        });
        const bill = await billModel.findOne({order:order._id , restaurant: restaurant._id})

        return {
            success: true,
            tableStatus: "occupied",
            restaurant: restaurant._id,
            table: table._id,
            customer,
            food,
            category,
            order,
            bill,
        };
    }


}

module.exports = { loginCustomer, LoadDashbord };