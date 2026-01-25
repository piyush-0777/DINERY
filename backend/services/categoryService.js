const mongoose = require('../config/mongoDB-connection')
const foodModel = require('../models/food-model')
const restaurantModel = require('../models/restaurant-model')
const deleteImage = require('../utils/deletImg')

const deletCategory = async (category_id , res_id)=>{
const session = await mongoose.startSession()
try {
    session.startTransaction()

    const category = await foodModel.findByIdAndDelete(category_id , {session});

    if(!category) {
        throw new Error("food not found");
    }

    await restaurantModel.updateOne({_id:res_id} ,
         {  $pull : {  foods: food_id  }} , {session} 
    )
    
    await session.commitTransaction();
    session.endSession();
    const result = await deleteImage(food.foodImg)
    console.log(result)
    return true;

} catch (error) {
    await session.abortTransaction();
    session.endSession()
    throw error
}
}

module.exports = {deletCategory}