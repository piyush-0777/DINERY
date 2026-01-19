const express = require('express');
const {uploadSingle} = require('../middlewares/multerMiddleware')
const {createFood} = require('../controllers/foodController')
const {authenticateResturant} = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/create', authenticateResturant, uploadSingle , createFood);

module.exports = router;