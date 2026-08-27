const restaurantRepository = require("../repositories/restaurantRepository");
const customerRepository = require("../repositories/customerRepository");
const restaurantService = require("../services/restaurantService");
const pricingService = require("../services/pricingService");
const subscriptionService = require("../services/subscriptionService");
const Order = require("../models/order-model");
const Bill = require("../models/bill-model");
const Restaurant = require("../models/restaurant-model");
const Subscription = require("../models/subscription-model");
const { sendSuccess, sendError } = require("../utils/responseHandler");
const ROLES = require("../constants/roles");

class AdminController {
  async getAllRestaurants(req, res) {
    try {
      const restaurants = await restaurantRepository.findAll();
      return sendSuccess(res, 200, "All restaurants fetched successfully", restaurants, {
        restaurants,
      });
    } catch (error) {
      console.error("Admin getAllRestaurants error:", error);
      return sendError(res, 500, error.message || "Failed to fetch restaurants");
    }
  }

  async getAllUsers(req, res) {
    try {
      const customers = await customerRepository.findAll();
      return sendSuccess(res, 200, "All users fetched successfully", customers, {
        users: customers,
      });
    } catch (error) {
      console.error("Admin getAllUsers error:", error);
      return sendError(res, 500, error.message || "Failed to fetch users");
    }
  }

  async getPlatformStats(req, res) {
    try {
      const [totalRestaurants, totalUsers, totalOrders, premiumRevenueData, activeSubsCount] =
        await Promise.all([
          restaurantRepository.count(),
          customerRepository.count(),
          Order.countDocuments(),
          // Calculate admin earnings exclusively from Premium Subscriptions
          Subscription.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
          ]),
          // Active subscriptions count
          restaurantRepository.count({ subscriptionStatus: { $in: ["trial", "active"] } }),
        ]);

      const adminRevenue = premiumRevenueData.length > 0 ? premiumRevenueData[0].totalRevenue : 0;

      const stats = {
        totalRestaurants,
        totalUsers,
        totalOrders,
        totalRevenue: adminRevenue,
        adminRevenue,
        activeSubscriptions: activeSubsCount,
      };

      return sendSuccess(res, 200, "Platform statistics fetched successfully", stats, {
        stats,
      });
    } catch (error) {
      console.error("Admin getPlatformStats error:", error);
      return sendError(res, 500, error.message || "Failed to fetch platform stats");
    }
  }

  async grantPremium(req, res) {
    try {
      const { restaurantId } = req.params;
      const { duration = "1_month", customDays } = req.body;

      if (!restaurantId) {
        return sendError(res, 400, "Restaurant ID is required");
      }

      const result = await subscriptionService.grantAdminSubscription(restaurantId, {
        duration,
        customDays,
      });

      return sendSuccess(
        res,
        200,
        `Premium granted successfully for ${result.daysGranted} days`,
        result.restaurant,
        {
          restaurant: result.restaurant,
          daysGranted: result.daysGranted,
          expiresAt: result.expiresAt,
        }
      );
    } catch (error) {
      console.error("Admin grantPremium error:", error);
      return sendError(res, error.statusCode || 500, error.message || "Failed to grant premium");
    }
  }

  async revokePremium(req, res) {
    try {
      const { restaurantId } = req.params;
      if (!restaurantId) {
        return sendError(res, 400, "Restaurant ID is required");
      }

      const result = await subscriptionService.revokeAdminSubscription(restaurantId);

      return sendSuccess(
        res,
        200,
        "Premium subscription revoked successfully",
        result.restaurant,
        {
          restaurant: result.restaurant,
        }
      );
    } catch (error) {
      console.error("Admin revokePremium error:", error);
      return sendError(res, error.statusCode || 500, error.message || "Failed to revoke premium");
    }
  }

  async getPricing(req, res) {
    try {
      const plans = await pricingService.getAllPlans();
      return sendSuccess(res, 200, "Pricing tiers retrieved successfully", plans, {
        plans,
      });
    } catch (error) {
      console.error("Admin getPricing error:", error);
      return sendError(res, 500, error.message || "Failed to fetch pricing");
    }
  }

  async updatePricing(req, res) {
    try {
      const { planKey } = req.params;
      const { priceINR, priceUSD, discountPercent, badge, isPopular } = req.body;

      if (!planKey) {
        return sendError(res, 400, "Plan key is required (1_month, 3_months, 12_months)");
      }

      const updated = await pricingService.updatePlanPricing(planKey, {
        priceINR,
        priceUSD,
        discountPercent,
        badge,
        isPopular,
      });

      return sendSuccess(res, 200, `Pricing updated for ${planKey}`, updated, {
        plan: updated,
      });
    } catch (error) {
      console.error("Admin updatePricing error:", error);
      return sendError(res, error.statusCode || 500, error.message || "Failed to update pricing");
    }
  }

  async updateRestaurantPlan(req, res) {
    try {
      const { restaurantId } = req.params;
      const { plan, isPremium } = req.body;

      if (!restaurantId) {
        return sendError(res, 400, "Restaurant ID is required");
      }

      if (!plan || !["free", "premium"].includes(plan)) {
        return sendError(res, 400, "Valid plan ('free' or 'premium') is required");
      }

      const updated = await restaurantRepository.updatePlan(
        restaurantId,
        plan,
        Boolean(isPremium || plan === "premium")
      );

      if (!updated) {
        return sendError(res, 404, "Restaurant not found");
      }

      return sendSuccess(res, 200, "Restaurant plan updated successfully", updated, {
        restaurant: updated,
      });
    } catch (error) {
      console.error("Admin updateRestaurantPlan error:", error);
      return sendError(res, 500, error.message || "Failed to update restaurant plan");
    }
  }

  async updateUserRole(req, res) {
    try {
      const { restaurantId } = req.params;
      const { role } = req.body;

      if (!restaurantId || !role) {
        return sendError(res, 400, "Restaurant ID and role are required");
      }

      if (![ROLES.OWNER, ROLES.ADMIN, ROLES.USER].includes(role)) {
        return sendError(res, 400, "Invalid role. Must be 'owner', 'admin', or 'user'");
      }

      const updated = await restaurantRepository.updateRole(restaurantId, role);
      if (!updated) {
        return sendError(res, 404, "Restaurant not found");
      }

      return sendSuccess(res, 200, "User role updated successfully", updated, {
        restaurant: updated,
      });
    } catch (error) {
      console.error("Admin updateUserRole error:", error);
      return sendError(res, 500, error.message || "Failed to update role");
    }
  }

  async createRestaurantOwner(req, res) {
    try {
      const {
        restaurantName,
        ownerName,
        ownerEmail,
        ownerPhone,
        password,
        address,
        plan = "trial",
      } = req.body;

      if (!restaurantName || !ownerName || !ownerEmail || !ownerPhone || !password || !address) {
        return sendError(res, 400, "All fields are required to create a restaurant owner");
      }

      // Check if email already exists
      const existing = await restaurantRepository.findByEmail(ownerEmail);
      if (existing) {
        return sendError(res, 400, "An account with this email already exists");
      }

      const result = await restaurantService.registerRestaurant({
        restaurantName,
        ownerName,
        ownerEmail,
        ownerPhone,
        password,
        address,
        role: ROLES.OWNER,
      });

      const createdId = result.restaurant?._id || result.user?.id;

      // If admin selected an upfront premium plan (1_month, 3_months, 12_months), grant it
      if (plan && plan !== "trial") {
        await subscriptionService.grantAdminSubscription(createdId, {
          duration: plan,
        });
      }

      const created = await restaurantRepository.findById(createdId);

      return sendSuccess(
        res,
        201,
        "Restaurant owner account created successfully",
        created,
        { restaurant: created }
      );
    } catch (error) {
      console.error("Admin createRestaurantOwner error:", error);
      return sendError(
        res,
        error.statusCode || 500,
        error.message || "Failed to create restaurant owner"
      );
    }
  }

  async deleteRestaurant(req, res) {
    try {
      const { restaurantId } = req.params;
      const restaurant = await restaurantRepository.findById(restaurantId);
      if (!restaurant) {
        return sendError(res, 404, "Restaurant not found");
      }

      await Restaurant.findByIdAndDelete(restaurantId);
      return sendSuccess(res, 200, "Restaurant account deleted successfully");
    } catch (error) {
      console.error("Admin deleteRestaurant error:", error);
      return sendError(res, 500, error.message || "Failed to delete restaurant");
    }
  }
}

module.exports = new AdminController();
