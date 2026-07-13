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
        table.status = "active";
        await table.save({ session });

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

module.exports = { loginCustomer };