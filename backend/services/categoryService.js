const mongoose = require('../config/mongoDB-connection')
const foodModel = require('../models/food-model')
const deleteImage = require('../utils/deletImg')
const foodService = require('./foodService')
const categoryModel = require('../models/categories-model')

const deletCategory = async (category_id, res_id) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const dFoods = await foodModel.find(
      { category: category_id },
      null,
      { session }
    );

    for (const food of dFoods) {
      await foodService.deletFood(food._id, res_id, session);
    }

    const dCategory = await categoryModel.findByIdAndDelete(
      category_id,
      { session }
    );

    if (!dCategory) {
      throw new Error('Category not found');
    }

    await session.commitTransaction();
    session.endSession();

    // external operation AFTER commit
    await deleteImage(dCategory.publicId);

    return true;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


module.exports = { deletCategory }