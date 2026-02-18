import mongoose from "../config/mongoDB-connection"
import restaurantModel from "../models/restaurant-model";
import tableModel from "../models/table-model";
//hello
const loginCustomer = async (restaurantName, token , name , phone) => {

    const session = await mongoose.startSession();
    try {
        session.startTransaction()
        const restaurant = await restaurantModel.findOne({ restaurantName }, null, { session });
        const table = await tableModel.findOneAndUpdate({ qrCode: token },
            { status: 'occupied' },
            { new: true }, { session })
        const loginCustomer = await customer.create({
            restaurant: restaurant._id,
            name,
            phone,
        } , { session })
        await session.commitTransaction()
        session.endSession()
        return loginCustomer;
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        return error;
    }
}

module.exports = {loginCustomer}