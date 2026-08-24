const foodService = require("../services/foodService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.createFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const restaurantId = req.restaurant?._id;

    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    if (!name?.trim() || price === undefined) {
      return sendError(res, 400, "Food name and price are required");
    }

    if (!req.file) {
      return sendError(res, 400, "Image is required");
    }

    const food = await foodService.createFood({
      restaurantId,
      name: name.trim(),
      description: description?.trim() || "",
      price: Number(price),
      category,
      file: req.file,
    });

    return sendSuccess(
      res,
      200,
      "Food item created successfully",
      food,
      { food }
    );
  } catch (error) {
    console.error("createFood error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.deletFood = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    const foodId = req.params.foodId;

    if (!restaurantId) {
      return sendError(res, 401, "Restaurant is not authenticated");
    }

    if (!foodId) {
      return sendError(res, 400, "Food ID is required");
    }

    await foodService.deletFood(foodId, restaurantId);

    return sendSuccess(res, 200, "Food item deleted successfully");
  } catch (error) {
    console.error("deletFood error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.editFood = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    if (!foodId) {
      return sendError(res, 400, "Food ID is required");
    }

    const { name, description, price, category, isAvailable } = req.body;

    const updatedFood = await foodService.editFood(foodId, {
      name: name !== undefined ? name.trim() : undefined,
      description: description !== undefined ? description.trim() : undefined,
      price: price !== undefined ? Number(price) : undefined,
      category,
      isAvailable: isAvailable !== undefined ? Boolean(isAvailable === "true" || isAvailable === true) : undefined,
      file: req.file,
    });

    return sendSuccess(
      res,
      200,
      "Food updated successfully",
      updatedFood,
      { data: updatedFood }
    );
  } catch (error) {
    console.error("editFood error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.changeAvailablity = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    if (!foodId) {
      return sendError(res, 400, "Food ID is required");
    }

    const updatedFood = await foodService.changeAvailability(foodId);

    return sendSuccess(
      res,
      200,
      "Food availability updated successfully",
      updatedFood,
      { data: updatedFood }
    );
  } catch (error) {
    console.error("changeAvailablity error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};