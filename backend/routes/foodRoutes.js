const express = require('express');
const {uploadSingle} = require('../middlewares/multerMiddleware')
const {createFood} = require('../controllers/foodController')

const router = express.Router()


router.post('/create', uploadSingle , createFood);

module.exports = router;