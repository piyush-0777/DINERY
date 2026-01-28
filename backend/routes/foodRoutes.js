const express = require('express');
const {uploadSingle} = require('../middlewares/multerMiddleware')
const {createFood , deletFood , editFood} = require('../controllers/foodController')
const {authenticateResturant} = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/create', authenticateResturant, uploadSingle , createFood);
router.delete('/deletfood/:foodId' ,authenticateResturant , deletFood )
router.put('/updatefood/:foodId' , authenticateResturant, uploadSingle ,editFood )

module.exports = router;