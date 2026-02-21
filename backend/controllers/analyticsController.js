const analyticsService = require("../services/analyticsService");

/* =========================================
   📈 Orders Per Period (day/week/month)
   Query:
   ?restaurantId=
   &startDate=
   &endDate=
========================================= */
exports.getOrdersAnalytics = async (req, res) => {
  try {
    const {  startDate, endDate } = req.query;
    const restaurantId = req.restaurant._id

    const data = await analyticsService.getDailySalesReport(
      restaurantId,
      startDate,
      endDate
    );

    res.json({
      success: true,
      message: "Orders analytics fetched successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================
   💰 Revenue Trend (Monthly)
========================================= */
exports.getRevenueTrend = async (req, res) => {
  try {
      const restaurantId = req.restaurant._id;

    const data = await analyticsService.getMonthlyRevenueReport(
      restaurantId
    );

    res.json({
      success: true,
      message: "Revenue trend fetched successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================
   🕒 Peak Hours
========================================= */
exports.getPeakHours = async (req, res) => {
  try {
    const {  startDate, endDate } = req.query;
     const restaurantId = req.restaurant._id
    const data = await analyticsService.getPeakHours(
      restaurantId,
      startDate,
      endDate
    );

    res.json({
      success: true,
      message: "Peak hours data fetched successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================
   🥇 Top Selling Items
========================================= */
exports.getTopSellingItems = async (req, res) => {
  try {
    const {  startDate, endDate } = req.query;
 const restaurantId = req.restaurant._id
    const data = await analyticsService.getTopSellingItems(
      restaurantId,
      startDate,
      endDate
    );

    res.json({
      success: true,
      message: "Top selling items fetched successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================
   📊 Order Type (Dine-in vs Online)
   Based on Order.table existence
========================================= */
exports.getOrderTypeAnalytics = async (req, res) => {
  try {
    const {  startDate, endDate } = req.query;
 const restaurantId = req.restaurant._id
    const data = await analyticsService.getOrderTypeAnalytics(
      restaurantId,
      startDate,
      endDate
    );

    res.json({
      success: true,
      message: "Order type analytics fetched successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================
   📊 Compare Two Periods
   ?restaurantId=
   &startDate1=&endDate1=
   &startDate2=&endDate2=
========================================= */
exports.compareRevenue = async (req, res) => {
  try {
    const {
      
      startDate1,
      endDate1,
      startDate2,
      endDate2
    } = req.query;
     const restaurantId = req.restaurant._id

    const period1 = await analyticsService.getDailySalesReport(
      restaurantId,
      startDate1,
      endDate1
    );

    const period2 = await analyticsService.getDailySalesReport(
      restaurantId,
      startDate2,
      endDate2
    );

    res.json({
      success: true,
      message: "Revenue comparison data",
      period1,
      period2
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};