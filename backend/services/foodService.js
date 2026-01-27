const mongoose = require('../config/mongoDB-connection');
const foodModel = require('../models/food-model');
const restaurantModel = require('../models/restaurant-model');
const deleteImage = require('../utils/deletImg');

const deletFood = async (food_id, res_id, session = null) => {
  let localSession = session;

  try {
    // start session only if not provided
    if (!localSession) {
      localSession = await mongoose.startSession();
      localSession.startTransaction();
    }

    const food = await foodModel.findByIdAndDelete(
      food_id,
      { session: localSession }
    );

    if (!food) {
      throw new Error('Food not found');
    }

    // 🔹 DB changes done → commit first
    if (!session) {
      await localSession.commitTransaction();
      localSession.endSession();
    }

    // 🔹 external service AFTER DB commit
    await deleteImage(food.publicId);

    return true;

  } catch (error) {
    if (!session && localSession) {
      await localSession.abortTransaction();
      localSession.endSession();
    }
    throw error;
  }
};

module.exports = { deletFood };