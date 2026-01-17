const express = require('express')
const {first} = require('../controllers/restaurantController')

const router = express.Router()

router.get('/' , first );

module.exports = router;

