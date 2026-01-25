const mongoose = require('../config/mongoDB-connection')
const foodModel = require('../models/food-model')
const restaurantModel = require('../models/restaurant-model')

const deletFood = async (food_id , res_id)=>{
const session = await mongoose.startSession()
try {
    session.startTransaction()

    const food = await foodModel.findByIdAndDelete(food_id , {session});

    if(!food) {
        throw new Error("food not found");
    }

    await restaurantModel.updateOne({_id:res_id} ,
         {  $pull : {  foods: food_id  }} , {session} 
    )
    
    await session.commitTransaction();
    session.endSession();

} catch (error) {
    await session.abortTransaction();
    session.endSession()
    throw error
}
}

module.exports = {deletFood}