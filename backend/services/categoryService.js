const mongoose = require('../config/mongoDB-connection')
const foodModel = require('../models/food-model')
const deleteImage = require('../utils/deletImg')
const foodService = require('./foodService')
const categoryModel = require('../models/categories-model')

const deletCategory = async (category_id, res_id) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const dFoods = await foodModel.find({ category: category_id }, { session })
        console.log(dFoods);
        dFoods.map(async (food) => {
            await foodService.deletFood(food._id, res_id)
        })

        const dCategory = await categoryModel.findByIdAndDelete(category_id, { session });

        const result = await deleteImage(dCategory.publicId)
        if (result == 'ok') {
            await session.commitTransaction()
            await session.endSession()
            return true
        } else {
            throw new Error('ime delection error');
        }

    } catch (error) {
        await session.abortTransaction();
        await session.endSession()
        throw error
    }
}

module.exports = { deletCategory }