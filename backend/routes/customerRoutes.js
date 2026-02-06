const express = require('express')
const router = express.Router()
const {customerLogin , loadCustomerDashbord , customerPlaceOrder} = require('../controllers/customerController')


router.post('/:restaurantName/login' , customerLogin)
router.get('/:restaurantName/loadCustomerDashbord' , loadCustomerDashbord)
router.post('/:restaurantName/placeOrder' , customerPlaceOrder)

module.exports = router;