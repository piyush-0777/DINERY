const analyticsService = require("../services/analyticsService");

exports.getOrdersAnalytics = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;
    const { type, year, month, week } = req.query;

    const data = await analyticsService.ordersAnalytics({
      restaurantId,
      type,
      year,
      month,
      week,
    });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getRevenueTrend = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;
    const { type, year, month, week } = req.query;

    const data = await analyticsService.revenueAnalytics({
      restaurantId,
      type,
      year,
      month,
      week,
    });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getTopSellingItems = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;
    const { type, year, month, week } = req.query;

    const data = await analyticsService.topItemsAnalytics({
      restaurantId,
      type,
      year,
      month,
      week,
    });

    res.json({ success: true, data });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};