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

const table = await tableModel.findOne({ qrCode: cleanToken });
console.log("DB Result:", table);

        if (!table) {
            throw new Error("Table not found");
        }

        if (table.status === 'occupied') {
        await session.abortTransaction();
            return false
        }

        // 🔥 Update table status
        table.status = 'occupied';
        await table.save({ session });

        const [newCustomer] = await customerModel.create(
            [{
                restaurant: restaurant._id,
                name,
                phone,
                table: table._id,
            }],
            { session }
        );

        await session.commitTransaction();

        return newCustomer;

    } catch (error) {
        await session.abortTransaction();
        console.log(error)
    } finally {
        session.endSession();
    }
};

module.exports = { loginCustomer };