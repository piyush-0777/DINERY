const pricingRepository = require("../repositories/pricingRepository");

class PricingService {
  async getAllPlans() {
    let plans = await pricingRepository.findAll();
    if (!plans || plans.length === 0) {
      await pricingRepository.seedDefaultPricing();
      plans = await pricingRepository.findAll();
    }
    return plans;
  }

  async getPlanByKey(planKey) {
    const plan = await pricingRepository.findByKey(planKey);
    if (!plan) {
      const error = new Error(`Plan '${planKey}' not found`);
      error.statusCode = 404;
      throw error;
    }
    return plan;
  }

  async updatePlanPricing(planKey, { priceINR, priceUSD, discountPercent, badge, isPopular }) {
    const plan = await pricingRepository.findByKey(planKey);
    if (!plan) {
      const error = new Error(`Plan '${planKey}' not found`);
      error.statusCode = 404;
      throw error;
    }

    const updateData = {};
    if (priceINR !== undefined) updateData.priceINR = Number(priceINR);
    if (priceUSD !== undefined) updateData.priceUSD = Number(priceUSD);
    if (discountPercent !== undefined) updateData.discountPercent = Number(discountPercent);
    if (badge !== undefined) updateData.badge = badge;
    if (isPopular !== undefined) updateData.isPopular = Boolean(isPopular);

    return await pricingRepository.updatePricing(planKey, updateData);
  }
}

module.exports = new PricingService();
