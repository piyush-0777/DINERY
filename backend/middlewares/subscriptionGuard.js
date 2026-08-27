const subscriptionService = require("../services/subscriptionService");
const { authenticate } = require("./authMiddleware");
const { sendError } = require("../utils/responseHandler");
const ROLES = require("../constants/roles");

/**
 * Hard Paywall Middleware
 * Enforces active 7-day free trial or active paid plan on all operational routes.
 * Automatically ensures user is authenticated before checking subscription status.
 */
const subscriptionGuard = async (req, res, next) => {
  try {
    // If not authenticated yet, invoke authenticate first
    if (!req.user && !req.restaurant) {
      return authenticate(req, res, () => subscriptionGuard(req, res, next));
    }

    // Admins bypass subscription requirements
    if (req.user?.role === ROLES.ADMIN) {
      return next();
    }

    const restaurant = req.restaurant;
    if (!restaurant) {
      return sendError(res, 401, "Authentication required to verify subscription.");
    }

    const subStatus = await subscriptionService.getSubscriptionStatus(restaurant);

    if (!subStatus.isSubscriptionActive) {
      return sendError(
        res,
        402, // 402 Payment Required
        "Subscription Required. Your 7-day free trial or plan has expired. Please upgrade to continue using restaurant features.",
        "Subscription expired",
        {
          isSubscriptionActive: false,
          trialExpired: true,
          subscriptionStatus: "expired",
          daysLeft: 0,
        }
      );
    }

    req.subscription = subStatus;
    next();
  } catch (error) {
    console.error("subscriptionGuard error:", error);
    return sendError(res, 500, "Internal error checking subscription status.");
  }
};

module.exports = subscriptionGuard;
