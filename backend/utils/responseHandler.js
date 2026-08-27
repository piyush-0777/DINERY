/**
 * Standardized API Response Utilities
 * Provides consistent response structures for success and error scenarios.
 */

/**
 * Send a standardized success response
 * @param {import('express').Response} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Informational success message
 * @param {any} data - Main data payload (optional)
 * @param {object} extra - Additional fields merged at root level for backward compatibility
 */
const sendSuccess = (res, statusCode = 200, message = "Success", data = null, extra = {}) => {
  const response = {
    success: true,
    statusCode,
    message,
    ...(data !== null && data !== undefined ? { data } : {}),
    ...extra,
  };
  return res.status(statusCode).json(response);
};

/**
 * Send a standardized error response
 * @param {import('express').Response} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} message - Informational error message
 * @param {any} error - Detailed error payload or error string
 * @param {object} extra - Additional fields merged at root level
 */
const sendError = (res, statusCode = 500, message = "Internal Server Error", error = null, extra = {}) => {
  const response = {
    success: false,
    statusCode,
    message: message || (typeof error === "string" ? error : "An error occurred"),
    error: error || message || "Internal Server Error",
    ...extra,
  };
  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendError,
};
