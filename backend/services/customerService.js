const mongoose = require("../config/mongoDB-connection");
const restaurantRepository = require("../repositories/restaurantRepository");
const tableRepository = require("../repositories/tableRepository");
const customerRepository = require("../repositories/customerRepository");
const foodRepository = require("../repositories/foodRepository");
const categoryRepository = require("../repositories/categoryRepository");
const orderRepository = require("../repositories/orderRepository");
const billRepository = require("../repositories/billRepository");

class CustomerService {
  async loginCustomer(restaurantName, token, name, phone) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const restaurant = await restaurantRepository.findByName(restaurantName, session);
      if (!restaurant) {
        throw new Error("Restaurant not found");
      }

      const cleanToken = token ? token.trim() : "";
      const table = await tableRepository.findByQRCode(cleanToken, session);
      if (!table) {
        throw new Error("Table not found");
      }

      // Customer already logged in
      if (table.status === "active") {
        await session.abortTransaction();
        session.endSession();
        return {
          success: false,
          tableStatus: "active",
        };
      }

      // Order already placed
      if (table.status === "occupied") {
        await session.abortTransaction();
        session.endSession();
        return {
          success: false,
          tableStatus: "occupied",
        };
      }

      // Create new customer session
      const newCustomer = await customerRepository.create(
        {
          restaurant: restaurant._id,
          name,
          phone,
          table: table._id,
        },
        session
      );

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        tableStatus: "available",
        restaurant: restaurant._id,
        table: table._id,
        customer: newCustomer,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async LoadDashbord(token, restaurantName) {
    const restaurant = await restaurantRepository.findByName(restaurantName);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const cleanToken = token ? token.trim() : "";
    const table = await tableRepository.findByQRCode(cleanToken);
    if (!table) {
      throw new Error("Table not found");
    }

    if (table.status === "available") {
      return {
        success: false,
        tableStatus: "available",
      };
    }

    const [food, category, customer] = await Promise.all([
      foodRepository.findAllByRestaurant(restaurant._id),
      categoryRepository.findAllByRestaurant(restaurant._id),
      table.currentCustomer ? customerRepository.findById(table.currentCustomer) : null,
    ]);

    if (table.status === "active") {
      return {
        success: true,
        tableStatus: "active",
        restaurant: restaurant._id,
        table: table._id,
        customer,
        food,
        category,
      };
    }

    if (table.status === "occupied") {
      const order = await orderRepository.findCustomerOrderByTable(
        customer ? customer._id : null,
        table._id
      );

      const bill = order
        ? await billRepository.findByOrderAndRestaurant(order._id, restaurant._id)
        : null;

      return {
        success: true,
        tableStatus: "occupied",
        restaurant: restaurant._id,
        table: table._id,
        customer,
        food,
        category,
        order,
        bill,
      };
    }

    return {
      success: false,
      tableStatus: table.status,
    };
  }
}

module.exports = new CustomerService();