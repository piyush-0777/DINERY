const express = require('express')
const {login , registerRestaurant ,getDashBord } = require('../controllers/restaurantController')
const {authenticateResturant} = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/login' , login );
router.post('/registerRestaurant' , registerRestaurant);
router.get('/dashboard',authenticateResturant,getDashBord )

module.exports = router;

