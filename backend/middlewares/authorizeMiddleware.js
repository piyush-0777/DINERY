const { sendError } = require("../utils/responseHandler");

/**
 * Authorization Middleware Factory for Role-Based Access Control (RBAC)
 * @param {...string} allowedRoles - Roles permitted to access the route
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return sendError(res, 401, "Authentication required. Please log in first.");
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        `Access denied. Required role: ${allowedRoles.join(" or ")}. Your role: ${req.user.role}`
      );
    }

    next();
  };
};

module.exports = authorize;
