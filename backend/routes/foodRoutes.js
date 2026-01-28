const express = require('express');
const {uploadSingle} = require('../middlewares/multerMiddleware')
const {createFood , deletFood , editFood , changeAvailablity} = require('../controllers/foodController')
const {authenticateResturant} = require('../middlewares/authMiddleware')

const router = express.Router()


router.post('/create', authenticateResturant, uploadSingle , createFood);
router.delete('/deletfood/:foodId' ,authenticateResturant , deletFood )
router.put('/updatefood/:foodId' , authenticateResturant, uploadSingle ,editFood )
router.put('/changeavailablity/:foodId' ,authenticateResturant ,changeAvailablity )

module.exports = router;