const pricingService = require("../services/pricingService");
const subscriptionService = require("../services/subscriptionService");
const paymentService = require("../services/paymentService");
const { sendSuccess, sendError } = require("../utils/responseHandler");

class SubscriptionController {
  async getPlans(req, res) {
    try {
      const plans = await pricingService.getAllPlans();
      return sendSuccess(res, 200, "Subscription plans retrieved successfully", plans, {
        plans,
      });
    } catch (error) {
      console.error("getPlans error:", error);
      return sendError(res, error.statusCode || 500, error.message || "Failed to fetch plans");
    }
  }

  async getStatus(req, res) {
    try {
      const restaurant = req.restaurant;
      if (!restaurant) {
        return sendError(res, 404, "Restaurant not found");
      }

      const status = await subscriptionService.getSubscriptionStatus(restaurant);
      return sendSuccess(res, 200, "Subscription status retrieved", status, status);
    } catch (error) {
      console.error("getStatus error:", error);
      return sendError(res, error.statusCode || 500, error.message || "Failed to fetch status");
    }
  }

  /**
   * Creates Razorpay Order for checkout
   */
  async createOrder(req, res) {
    try {
      const restaurant = req.restaurant;
      if (!restaurant) {
        return sendError(res, 404, "Restaurant not found");
      }

      const { planKey, currency = "INR" } = req.body;
      if (!planKey) {
        return sendError(res, 400, "Plan key is required (1_month, 3_months, 12_months)");
      }

      const order = await paymentService.createSubscriptionOrder({
        restaurant,
        planKey,
        currency,
      });

      return sendSuccess(res, 200, "Payment order created successfully", order, order);
    } catch (error) {
      console.error("createOrder error:", error);
      return sendError(res, error.statusCode || 500, error.message || "Failed to create payment order");
    }
  }

  /**
   * Verifies Razorpay payment signature and activates subscription
   */
  async verifyPayment(req, res) {
    try {
      const restaurant = req.restaurant;
      if (!restaurant) {
        return sendError(res, 404, "Restaurant not found");
      }

      const { orderId, paymentId, signature, planKey, currency = "INR" } = req.body;

      if (!orderId || !paymentId || !planKey) {
        return sendError(res, 400, "Missing required payment verification details");
      }

      const result = await paymentService.verifySubscriptionPayment({
        restaurantId: restaurant._id,
        orderId,
        paymentId,
        signature,
        planKey,
        currency,
      });

      return sendSuccess(
        res,
        200,
        `Payment verified and plan '${planKey}' activated successfully!`,
        result.subscription,
        {
          subscription: result.subscription,
          restaurant: result.restaurant,
        }
      );
    } catch (error) {
      console.error("verifyPayment error:", error);
      return sendError(
        res,
        error.statusCode || 500,
        error.message || "Payment verification failed"
      );
    }
  }

  async activateSubscription(req, res) {
    try {
      const restaurant = req.restaurant;
      if (!restaurant) {
        return sendError(res, 404, "Restaurant not found");
      }

      const { planKey, currency = "INR", paymentMethod = "direct", paymentId = "manual" } = req.body;
      if (!planKey) {
        return sendError(res, 400, "Plan key is required (1_month, 3_months, 12_months)");
      }

      const result = await subscriptionService.activateSubscription(restaurant._id, {
        planKey,
        currency,
        paymentMethod,
        paymentId,
      });

      return sendSuccess(
        res,
        200,
        `Subscription activated successfully for plan: ${planKey}`,
        result.subscription,
        {
          subscription: result.subscription,
          restaurant: result.restaurant,
        }
      );
    } catch (error) {
      console.error("activateSubscription error:", error);
      return sendError(
        res,
        error.statusCode || 500,
        error.message || "Subscription activation failed"
      );
    }
  }
}

module.exports = new SubscriptionController();
