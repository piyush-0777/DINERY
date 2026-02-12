const express = require('express');
const {authenticateResturant} = require('../middlewares/authMiddleware') 
const {updateOrderStatus , getOrderById} =  require('../controllers/orderController')
const router = express.Router()

router.put('/:orderId/status', authenticateResturant , updateOrderStatus)
router.get('/:orderId' ,authenticateResturant ,getOrderById  )
module.exports = router;