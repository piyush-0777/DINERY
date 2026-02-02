const express = require('express')
const router = express.Router()
const {customerLogin , loadCustomerDashbord} = require('../controllers/customerController')

router.post('/:restaurantName/login' , customerLogin)
router.get('/:restaurantName/loadCustomerDashbord' , loadCustomerDashbord)

module.exports = router;