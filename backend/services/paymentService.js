const crypto = require("crypto");
const { razorpay, isConfigured, key_id, key_secret } = require("../config/razorpay");
const pricingService = require("./pricingService");
const subscriptionService = require("./subscriptionService");

class PaymentService {
  /**
   * Creates a Razorpay Order for a subscription plan tier
   */
  async createSubscriptionOrder({ restaurant, planKey, currency = "INR" }) {
    if (!planKey) {
      const error = new Error("Plan key is required");
      error.statusCode = 400;
      throw error;
    }

    const plan = await pricingService.getPlanByKey(planKey);
    const rawPrice = currency === "USD" ? plan.priceUSD : plan.priceINR;

    // Razorpay requires amounts in the smallest currency sub-unit:
    // INR: Paise (multiply by 100) -> ₹499 = 49900 paise
    // USD: Cents (multiply by 100) -> $6.99 = 699 cents
    const amountInSubunits = Math.round(rawPrice * 100);

    const receipt = `sub_${Date.now()}_${restaurant._id.toString().slice(-4)}`;

    if (isConfigured && razorpay) {
      const options = {
        amount: amountInSubunits,
        currency: currency.toUpperCase(),
        receipt,
        notes: {
          restaurantId: restaurant._id.toString(),
          restaurantName: restaurant.restaurantName,
          planKey,
          currency,
        },
      };

      const order = await razorpay.orders.create(options);

      return {
        orderId: order.id,
        amount: rawPrice,
        subUnitAmount: order.amount,
        currency: order.currency,
        keyId: key_id,
        planKey,
        isSimulated: false,
      };
    } else {
      // Local development/test simulation fallback
      const simulatedOrderId = `order_sim_${Date.now()}_${Math.random().toString(36).substring(7)}`;

      return {
        orderId: simulatedOrderId,
        amount: rawPrice,
        subUnitAmount: amountInSubunits,
        currency: currency.toUpperCase(),
        keyId: key_id,
        planKey,
        isSimulated: true,
      };
    }
  }

  /**
   * Verifies Razorpay payment signature and activates the restaurant subscription
   */
  async verifySubscriptionPayment({
    restaurantId,
    orderId,
    paymentId,
    signature,
    planKey,
    currency = "INR",
  }) {
    if (!orderId || !paymentId) {
      const error = new Error("Missing required payment verification details");
      error.statusCode = 400;
      throw error;
    }

    // Verify cryptographic HMAC-SHA256 signature if in real Razorpay mode
    if (isConfigured) {
      const body = `${orderId}|${paymentId}`;
      const expectedSignature = crypto
        .createHmac("sha256", key_secret)
        .update(body.toString())
        .digest("hex");

      const isAuthentic = expectedSignature === signature;

      if (!isAuthentic) {
        const error = new Error("Payment signature verification failed. Transaction invalid.");
        error.statusCode = 400;
        throw error;
      }
    }

    // Signature authentic -> Activate subscription in database
    const activationResult = await subscriptionService.activateSubscription(restaurantId, {
      planKey,
      currency,
      paymentMethod: "razorpay",
      paymentId,
    });

    return activationResult;
  }
}

module.exports = new PaymentService();
