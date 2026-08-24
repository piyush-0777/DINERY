const jwt = require("jsonwebtoken");
const restaurantRepository = require("../repositories/restaurantRepository");
const foodRepository = require("../repositories/foodRepository");
const categoryRepository = require("../repositories/categoryRepository");
const tableService = require("./tableService");
const orderRepository = require("../repositories/orderRepository");
const billRepository = require("../repositories/billRepository");
const { hashPasswordGenerater, hashPasswordChecker } = require("../utils/hashPassword");

class RestaurantService {
  async login({ ownerEmail, password }) {
    const restaurant = await restaurantRepository.findByEmail(ownerEmail);
    if (!restaurant) {
      const error = new Error("Restaurant not found. Please register first.");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await hashPasswordChecker(password, restaurant.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { id: restaurant._id, ownerEmail: restaurant.ownerEmail },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "48h" }
    );

    return { token, restaurant };
  }

  async registerRestaurant({
    restaurantName,
    address,
    ownerName,
    password,
    ownerPhone,
    ownerEmail,
  }) {
    if (!ownerEmail || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }

    const existingEmail = await restaurantRepository.findByEmail(ownerEmail);
    if (existingEmail) {
      const error = new Error("Email already registered");
      error.statusCode = 409;
      throw error;
    }

    const existingName = await restaurantRepository.findByName(restaurantName);
    if (existingName) {
      const error = new Error("Restaurant name is already in use");
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await hashPasswordGenerater(password);

    const restaurant = await restaurantRepository.create({
      restaurantName,
      address,
      ownerName,
      password: hashedPassword,
      ownerPhone,
      ownerEmail,
    });

    const token = jwt.sign(
      { id: restaurant._id, ownerEmail: restaurant.ownerEmail },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "48h" }
    );

    return {
      token,
      user: {
        id: restaurant._id,
        ownerName: restaurant.ownerName,
        ownerEmail: restaurant.ownerEmail,
        restaurantName: restaurant.restaurantName,
      },
    };
  }

  async getDashboardData(restaurant) {
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const restaurantId = restaurant._id;

    // Parallel fetch for optimal performance
    const [foods, category, tables, order, Last7DaysOrders, bill] = await Promise.all([
      foodRepository.findAllByRestaurant(restaurantId),
      categoryRepository.findAllByRestaurant(restaurantId),
      tableService.getAllTable(restaurant),
      orderRepository.findTodayOrders(restaurantId),
      orderRepository.getLast7DaysOrders(restaurantId),
      billRepository.findAllByRestaurant(restaurantId),
    ]);

    return {
      restaurant,
      foods,
      category,
      tables,
      order,
      bill,
      Last7DaysOrders,
    };
  }
}

module.exports = new RestaurantService();
