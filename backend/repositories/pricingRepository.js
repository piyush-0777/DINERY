const Pricing = require("../models/pricing-model");

const DEFAULT_PLANS = [
  {
    planKey: "1_month",
    title: "1 Month Plan",
    durationDays: 30,
    priceINR: 499,
    priceUSD: 6.99,
    discountPercent: 0,
    isPopular: false,
    badge: "Standard",
    description: "Great for testing and short-term restaurant operations.",
    features: [
      { label: "Unlimited Restaurant Tables", available: true },
      { label: "Unlimited Customer QR Orders", available: true },
      { label: "Kitchen Display & Order Management", available: true },
      { label: "Advanced Business Analytics", available: true },
      { label: "Sales & Tax Reports Export", available: true },
      { label: "Priority 24/7 Support", available: true },
    ],
  },
  {
    planKey: "3_months",
    title: "3 Months Plan",
    durationDays: 90,
    priceINR: 1299,
    priceUSD: 16.99,
    discountPercent: 15,
    isPopular: true,
    badge: "Most Popular - Save 15%",
    description: "Our most popular tier for growing dine-in restaurants.",
    features: [
      { label: "Unlimited Restaurant Tables", available: true },
      { label: "Unlimited Customer QR Orders", available: true },
      { label: "Kitchen Display & Order Management", available: true },
      { label: "Advanced Business Analytics", available: true },
      { label: "Sales & Tax Reports Export", available: true },
      { label: "Priority 24/7 Support", available: true },
    ],
  },
  {
    planKey: "12_months",
    title: "12 Months (1 Year)",
    durationDays: 365,
    priceINR: 4499,
    priceUSD: 54.99,
    discountPercent: 25,
    isPopular: false,
    badge: "Best Value - Save 25%",
    description: "Full year of complete restaurant management with maximum savings.",
    features: [
      { label: "Unlimited Restaurant Tables", available: true },
      { label: "Unlimited Customer QR Orders", available: true },
      { label: "Kitchen Display & Order Management", available: true },
      { label: "Advanced Business Analytics", available: true },
      { label: "Sales & Tax Reports Export", available: true },
      { label: "Priority 24/7 Support", available: true },
    ],
  },
];

class PricingRepository {
  async findAll(session = null) {
    const query = Pricing.find().sort({ durationDays: 1 });
    if (session) query.session(session);
    return await query.exec();
  }

  async findByKey(planKey, session = null) {
    const query = Pricing.findOne({ planKey });
    if (session) query.session(session);
    return await query.exec();
  }

  async updatePricing(planKey, updateData, session = null) {
    const options = { new: true, runValidators: true };
    if (session) options.session = session;

    return await Pricing.findOneAndUpdate(
      { planKey },
      { $set: { ...updateData, updatedAt: new Date() } },
      options
    );
  }

  async seedDefaultPricing() {
    const count = await Pricing.countDocuments();
    if (count === 0) {
      console.log("Seeding default subscription pricing plans (1M, 3M, 12M)...");
      await Pricing.insertMany(DEFAULT_PLANS);
      console.log("Default pricing plans successfully seeded.");
    }
  }
}

module.exports = new PricingRepository();
