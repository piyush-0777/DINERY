const reportService = require("../services/reportService");



// =====================
// customer report
// =====================

exports.getCustomerReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;

    const data = await reportService.getCustomerReportService(
      restaurantId
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// =====================
// daily sale
// =====================

exports.getDailySaleReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;

    const data = await reportService.getDailySaleReportService(
      restaurantId
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// =====================
// GST
// =====================

exports.getGSTReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;

    const data = await reportService.getGSTReportService(
      restaurantId
    );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// =====================
// Monthly revenue
// =====================

exports.getMonthlyRevenueReport = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;

    const data =
      await reportService.getMonthlyRevenueReportService(
        restaurantId
      );

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};