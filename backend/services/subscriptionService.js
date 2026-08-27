const restaurantRepository = require("../repositories/restaurantRepository");
const pricingService = require("./pricingService");
const Subscription = require("../models/subscription-model");

class SubscriptionService {
  /**
   * Evaluates dynamic subscription status for a restaurant.
   * Accurately calculates trial based on registration date (createdAt) so accounts older
   * than 7 days without paid plans are properly expired and paywalled.
   */
  async getSubscriptionStatus(restaurant) {
    if (!restaurant) {
      const error = new Error("Restaurant not found");
      error.statusCode = 404;
      throw error;
    }

    const now = new Date();

    // 1. Paid active plan check
    if (restaurant.subscriptionStatus === "active" && restaurant.subscriptionExpiresAt) {
      const expiresAt = new Date(restaurant.subscriptionExpiresAt);
      if (expiresAt > now) {
        const daysLeft = Math.ceil((expiresAt - now) / (1000 * 60 * 60 * 24));
        return {
          isSubscriptionActive: true,
          status: "active",
          plan: restaurant.currentPlan || "premium",
          daysLeft,
          expiresAt,
          currencyPreference: restaurant.currencyPreference || "INR",
        };
      }
    }

    // 2. 7-Day Free Trial check based on actual registration date (createdAt)
    const registrationDate = restaurant.createdAt ? new Date(restaurant.createdAt) : now;
    const trialStartedAt = restaurant.trialStartedAt
      ? new Date(restaurant.trialStartedAt)
      : registrationDate;

    // The true trial expiration date: 7 days after registration/trialStartedAt
    const trialExpiresAt = restaurant.trialExpiresAt
      ? new Date(restaurant.trialExpiresAt)
      : new Date(trialStartedAt.getTime() + 7 * 24 * 60 * 60 * 1000);

    // If trial is still within 7 days from signup
    if (trialExpiresAt > now && (restaurant.subscriptionStatus === "trial" || !restaurant.subscriptionStatus)) {
      const daysLeft = Math.ceil((trialExpiresAt - now) / (1000 * 60 * 60 * 24));
      return {
        isSubscriptionActive: true,
        status: "trial",
        plan: "trial",
        daysLeft,
        expiresAt: trialExpiresAt,
        currencyPreference: restaurant.currencyPreference || "INR",
      };
    }

    // 3. Expired: Registration date is older than 7 days and no active paid plan
    if (restaurant.subscriptionStatus !== "expired" || restaurant.isPremium !== false) {
      await restaurantRepository.updateSubscriptionDetails(restaurant._id, {
        subscriptionStatus: "expired",
        isPremium: false,
        plan: "free",
        trialStartedAt,
        trialExpiresAt,
      });
    }

    return {
      isSubscriptionActive: false,
      status: "expired",
      plan: "none",
      daysLeft: 0,
      expiresAt: trialExpiresAt,
      currencyPreference: restaurant.currencyPreference || "INR",
    };
  }

  /**
   * Upgrades and activates a subscription plan
   */
  async activateSubscription(restaurantId, { planKey, currency = "INR", paymentMethod = "direct", paymentId = "manual" }) {
    const plan = await pricingService.getPlanByKey(planKey);
    const amount = currency === "USD" ? plan.priceUSD : plan.priceINR;

    const days = plan.durationDays;
    const now = new Date();
    const subscriptionExpiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const updatedRestaurant = await restaurantRepository.grantSubscription(restaurantId, {
      currentPlan: planKey,
      subscriptionExpiresAt,
      subscriptionStatus: "active",
    });

    // Save subscription history record
    await Subscription.create({
      restaurant: restaurantId,
      plan: planKey,
      price: amount,
      currency,
      paymentMethod,
      paymentId,
      startDate: now,
      endDate: subscriptionExpiresAt,
      isActive: true,
    });

    return {
      restaurant: updatedRestaurant,
      subscription: {
        plan: planKey,
        amount,
        currency,
        days,
        expiresAt: subscriptionExpiresAt,
        status: "active",
      },
    };
  }

  /**
   * Admin manual subscription grant
   */
  async grantAdminSubscription(restaurantId, { duration = "1_month", customDays = 30 }) {
    let days = 30;
    let planKey = duration;

    if (duration === "1_month") days = 30;
    else if (duration === "3_months") days = 90;
    else if (duration === "12_months") days = 365;
    else if (duration === "custom") {
      days = Number(customDays) || 30;
      planKey = `${days}_days_custom`;
    }

    const now = new Date();
    const subscriptionExpiresAt = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    const updatedRestaurant = await restaurantRepository.grantSubscription(restaurantId, {
      currentPlan: planKey,
      subscriptionExpiresAt,
      subscriptionStatus: "active",
    });

    // Log admin grant
    await Subscription.create({
      restaurant: restaurantId,
      plan: planKey,
      price: 0,
      startDate: now,
      endDate: subscriptionExpiresAt,
      isActive: true,
    });

    return {
      restaurant: updatedRestaurant,
      daysGranted: days,
      expiresAt: subscriptionExpiresAt,
    };
  }

  /**
   * Admin manual subscription revocation / removal
   */
  async revokeAdminSubscription(restaurantId) {
    const updatedRestaurant = await restaurantRepository.revokeSubscription(restaurantId);

    // Deactivate all active subscription records in history
    await Subscription.updateMany(
      { restaurant: restaurantId, isActive: true },
      { $set: { isActive: false, endDate: new Date() } }
    );

    return {
      restaurant: updatedRestaurant,
      message: "Subscription successfully revoked",
    };
  }
}

module.exports = new SubscriptionService();
