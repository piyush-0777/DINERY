const jwt = require('jsonwebtoken')
require('dotenv').config()
const RestaurantModel = require('../models/restaurant-model')

const authenticateResturant = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            res.status(401).json({ error: 'token is not provide' })
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        if (decoded) {
            const restaurant = await RestaurantModel.findOne({ownerEmail:decoded.ownerEmail});
            if (!restaurant) {
                res.status(400).json({ error: 'unvalid token' })
            } else {
                req.restaurant = restaurant;
                next()
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {authenticateResturant};