const mongoose = require("../config/mongoDB-connection");
const restaurantModel = require("../models/restaurant-model");
const tableModel = require("../models/table-model");
const customerModel = require("../models/customer-model");

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

        const table = await tableModel.findOneAndUpdate(
            { qrCode: token },
            { status: "occupied" },
            { new: true, session }
        );

        if (!table) {
            throw new Error("Table not found");
        }

        const newCustomer = await customerModel.create(
            [{
                restaurant: restaurant._id,
                name,
                phone,
            }],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return newCustomer[0];

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

module.exports = { loginCustomer };