const restaurantService = require("../services/restaurantService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

exports.login = async (req, res) => {
  try {
    const { ownerEmail, password } = req.body;
    if (!ownerEmail || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const { token, restaurant } = await restaurantService.login({ ownerEmail, password });

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 48 * 60 * 60 * 1000,
    });

    return sendSuccess(res, 200, "Logged in successfully", {
      id: restaurant._id,
      ownerEmail: restaurant.ownerEmail,
      restaurantName: restaurant.restaurantName,
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal server error");
  }
};

exports.registerRestaurant = async (req, res) => {
  try {
    const {
      restaurantName,
      address,
      ownerName,
      password,
      ownerPhone,
      ownerEmail,
    } = req.body;

    const { token, user } = await restaurantService.registerRestaurant({
      restaurantName,
      address,
      ownerName,
      password,
      ownerPhone,
      ownerEmail,
    });

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 48 * 60 * 60 * 1000,
    });

    return sendSuccess(
      res,
      201,
      "Restaurant registered successfully",
      user,
      { user }
    );
  } catch (error) {
    console.error("Register error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Internal server error");
  }
};

exports.getDashBord = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return sendError(res, 404, "Restaurant not found");
    }

    const data = await restaurantService.getDashboardData(restaurant);

    return sendSuccess(
      res,
      200,
      "Dashboard fetched successfully",
      data,
      {
        restaurant: data.restaurant,
        foods: data.foods,
        category: data.category,
        tables: data.tables,
        order: data.order,
        bill: data.bill,
        Last7DaysOrders: data.Last7DaysOrders,
      }
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return sendError(res, error.statusCode || 500, error.message || "Server error");
  }
};
