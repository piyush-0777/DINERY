const { sendError } = require("../utils/responseHandler");

/**
 * Global Error Handling Middleware
 */
const errorMiddleware = (err, req, res, next) => {
  console.error("Unhandled Error:", err.stack || err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";

  return sendError(res, statusCode, message, err.message || "Server Error");
};

module.exports = errorMiddleware;