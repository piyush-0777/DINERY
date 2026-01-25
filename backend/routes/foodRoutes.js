const express = require('express');
const {uploadSingle} = require('../middlewares/multerMiddleware')
const {createFood , deletFood} = require('../controllers/foodController')
const {authenticateResturant} = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/create', authenticateResturant, uploadSingle , createFood);
router.delete('/deletfood/:foodId' ,authenticateResturant , deletFood )

module.exports = router;