const express = require('express');
const {
    UpdateRestaurantProfile , 
    UpdateOwnerInformation ,
    UpdateGSTNumber ,
    UpdatePassword ,

} = require('../controllers/settingController')
const {authenticateResturant} = require('../middlewares/authMiddleware')
const {uploadSingle} = require('../middlewares/multerMiddleware')

const router = express.Router();
router.patch('/RestaurantProfileUpdate',authenticateResturant, uploadSingle , UpdateRestaurantProfile)
router.patch('/OwnerInformationUpdate', authenticateResturant , UpdateOwnerInformation)
router.patch('/GSTNumberUpdate',authenticateResturant, UpdateGSTNumber)
router.patch('/PasswordUpdate',authenticateResturant, UpdatePassword)

module.exports = router