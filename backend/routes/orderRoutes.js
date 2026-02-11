const express = require('express');
const {authenticateResturant} = require('../middlewares/authMiddleware') 
const {updateOrderStatus} =  require('../controllers/orderController')
const router = express.Router()

router.put('/:orderId/status', authenticateResturant , updateOrderStatus)
module.exports = router;