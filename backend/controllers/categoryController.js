const categoryService = require("../services/categoryService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) {
      return sendError(res, 400, "Category name is required");
    }

    if (!req.file) {
      return sendError(res, 400, "Category image is required");
    }

    const restaurantId = req.restaurant._id;
    const category = await categoryService.addCategory({
      restaurantId,
      name: name.trim(),
      file: req.file,
    });

    return sendSuccess(
      res,
      200,
      "Category added successfully",
      category,
      { category }
    );
  } catch (error) {
    console.error("addCategory error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};

exports.deletCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const restaurant = req.restaurant;

    if (!restaurant || !categoryId) {
      return sendError(res, 400, "Restaurant or category ID is missing");
    }

    await categoryService.deletCategory(categoryId, restaurant._id);

    return sendSuccess(res, 200, "Category deleted successfully");
  } catch (error) {
    console.error("deletCategory error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal server error");
  }
};

exports.editCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      return sendError(res, 400, "Category ID is required");
    }

    const updatedCategory = await categoryService.editCategory(categoryId, {
      name: req.body.name?.trim(),
      file: req.file,
    });

    return sendSuccess(
      res,
      200,
      "Category updated successfully",
      updatedCategory,
      { data: updatedCategory }
    );
  } catch (error) {
    console.error("editCategory error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};
