
const customer = require('../models/customer-model')
const restaurantModel = require('../models/restaurant-model')
const tableModel = require('../models/table-model')
const foodModel = require('../models/food-model')
const categoryModel = require('../models/categories-model')

exports.customerLogin = async (req, res) => {
    const { name, phone } = req.body
    const { restaurantName } = req.params;

    const restaurant = await restaurantModel.findOne({ restaurantName })

    const loginCustomer = await customer.create({
        restaurant: restaurant._id,
        name,
        phone,
    })

    if (loginCustomer) {
        res.status(200).json({ message: 'loged in.', data: loginCustomer })
    } else {
        res.status(400).json({ error: 'error in login' })
    }

}

exports.loadCustomerDashbord = async (req, res) => {
    try {
        const { restaurantName } = req.params;
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: 'token is not provide' });
        }
        if (!restaurantName) {
            return res.status(401).json({ error: 'restaurantName is not provide' });
        }


        const restaurant = await restaurantModel.findOne({ restaurantName })

        const food = await foodModel.find({ restaurant: restaurant._id })
        const category = await categoryModel.find({ restaurant: restaurant._id })

        return res.status(200).json({
            message: 'dashbord is load',
            food, category
        });
    } catch (error) {

        return res.status(401).json({ error: ' server error' });
    }
}