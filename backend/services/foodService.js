const mongoose = require('../config/mongoDB-connection')
const foodModel = require('../models/food-model')
const restaurantModel = require('../models/restaurant-model')
const deleteImage = require('../utils/deletImg')

const deletFood = async (food_id, res_id) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const food = await foodModel.findByIdAndDelete(food_id, { session });

        if (!food) {
            throw new Error("food not found");
        }

    //    const resf =  await restaurantModel.updateOne({ _id: res_id },
    //         { $pull: { foods: food_id } }, { session }
    //     )
    // console.log('piyu',resf)
   
        const result = await deleteImage(food.publicId);
        console.log(result)
        if (result == 'ok') {
            await session.commitTransaction();
            session.endSession()
            console.log('okkkkkkk')
            return true;
        } else {
            console.log('this is now now')
            throw new Error('image delection error');
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession()
        throw new Error (error)
    }
}

module.exports = { deletFood }