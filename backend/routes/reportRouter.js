const express = require('express');
const {authenticateResturant} = require('../middlewares/authMiddleware')

const reportController = require('../controllers/reportController')

const router = express.Router();

router.get('/customer-report', authenticateResturant ,reportController.getCustomerReport );
router.get('/dailySale-report', authenticateResturant ,reportController.getDailySaleReport );
router.get('/GST-report', authenticateResturant ,reportController.getGSTReport );
router.get('/monthlyRevenue-report', authenticateResturant ,reportController.getMonthlyRevenueReport );

module.exports = router;
