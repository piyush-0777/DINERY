const express = require('express')
const router = express.Router()
const {customerLogin} = require('../controllers/customerController')

router.post('/:restaurantId/login' , customerLogin)

module.exports = router;