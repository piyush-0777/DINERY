const jwt = require("jsonwebtoken");
require("dotenv").config();
const RestaurantModel = require("../models/restaurant-model");
const CustomerModel = require("../models/customer-model");
const TableModel = require("../models/table-model");
const ROLES = require("../constants/roles");
const authorize = require("./authorizeMiddleware");
const { sendError } = require("../utils/responseHandler");

/**
 * Main Authentication Middleware
 * Verifies JWT token and attaches user profile + role to req.user and req.restaurant
 */
const authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return sendError(res, 401, "Authentication token missing. Please log in.");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return sendError(res, 401, "Invalid or expired token. Please log in again.");
    }

    // Check Restaurant (Owner / Admin)
    if (decoded.ownerEmail || decoded.id) {
      const query = decoded.ownerEmail
        ? { ownerEmail: decoded.ownerEmail }
        : { _id: decoded.id };

      const restaurant = await RestaurantModel.findOne(query);
      if (restaurant) {
        req.restaurant = restaurant;
        req.user = {
          id: restaurant._id,
          email: restaurant.ownerEmail,
          role: restaurant.role || decoded.role || ROLES.OWNER,
          restaurantName: restaurant.restaurantName,
        };
        return next();
      }
    }

    // Check Customer / User
    if (decoded.role === ROLES.USER || decoded.customerId) {
      const customer = await CustomerModel.findById(decoded.id || decoded.customerId);
      if (customer) {
        req.customer = customer;
        req.user = {
          id: customer._id,
          role: customer.role || ROLES.USER,
          name: customer.name,
          phone: customer.phone,
        };
        return next();
      }
    }

    // Fallback: Attach decoded payload if valid
    req.user = {
      id: decoded.id,
      email: decoded.ownerEmail || decoded.email,
      role: decoded.role || ROLES.USER,
    };
    return next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return sendError(res, 500, "Internal server error during authentication");
  }
};

/**
 * Customer Authentication Middleware
 * Supports customer JWT tokens and Table QR UUID tokens for backward compatibility
 */
const authenticateCustomer = async (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] ||
      req.cookies?.token ||
      req.body?.token;

    if (!token) {
      return sendError(res, 401, "Session token is required.");
    }

    const cleanToken = token.trim();

    // 1. Try checking if it's a JWT token
    try {
      const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET_KEY);
      if (decoded) {
        req.user = {
          id: decoded.id,
          role: decoded.role || ROLES.USER,
          tableId: decoded.tableId,
          restaurantId: decoded.restaurantId,
        };
        return next();
      }
    } catch {
      // Not a JWT, check if it is a Table QR UUID
    }

    // 2. Check if token matches a Table QR Code UUID
    const table = await TableModel.findOne({ qrCode: cleanToken });
    if (table) {
      req.table = table;
      req.user = {
        id: table.currentCustomer || null,
        role: ROLES.USER,
        tableId: table._id,
        restaurantId: table.restaurant,
      };
      return next();
    }

    return sendError(res, 401, "Invalid session or table token.");
  } catch (error) {
    console.error("Customer authentication error:", error);
    return sendError(res, 500, "Internal server error during customer authentication");
  }
};

// Convenience role-based guards
const isOwner = [authenticate, authorize(ROLES.OWNER, ROLES.ADMIN)];
const isAdmin = [authenticate, authorize(ROLES.ADMIN)];
const isUser = [authenticate, authorize(ROLES.USER, ROLES.OWNER, ROLES.ADMIN)];

module.exports = {
  authenticate,
  authenticateCustomer,
  authorize,
  isOwner,
  isAdmin,
  isUser,
  // Backward compatibility alias:
  authenticateResturant: authenticate,
};