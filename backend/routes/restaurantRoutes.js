const express = require('express')
const {login , registerRestaurant} = require('../controllers/restaurantController')

const router = express.Router()

router.get('/login' , login );
router.post('/registerRestaurant' , registerRestaurant)

module.exports = router;

