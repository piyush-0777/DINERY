
const customer = require('../models/customer-model')
const restaurantModel = require('../models/restaurant-model')
const tableModel = require('../models/table-model')
const foodModel = require('../models/food-model')
const categoryModel = require('../models/categories-model')
const orderModel = require('../models/order-model')
const billModel = require('../models/bill-model')
const customerService = require('../services/customerService')
const tableService = require("../services/tableService");
const orderService = require("../services/orderService");
const {sendNewOrderNotification , sendTableUpdateNotification} = require('../socket/socketEvent')


exports.customerLogin = async (req, res) => {
    try {
        const { name, phone , token } = req.body;
        const { restaurantName } = req.params;
        console.log(token);

        // const token =
        //     req.cookies?.token ||
        //     req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is not provided."
            });
        }

        const loginCustomer = await customerService.loginCustomer(
            restaurantName,
            token,
            name,
            phone
        );

        if (!loginCustomer.success) {

            if (loginCustomer.tableStatus === "active") {
                return res.status(409).json({
                    success: false,
                    tableStatus: "active",
                    message: "A customer is already using this table."
                });
            }

            if (loginCustomer.tableStatus === "occupied") {
                return res.status(409).json({
                    success: false,
                    tableStatus: "occupied",
                    message: "An order has already been placed for this table."
                });
            }
        }

          await tableService.updateTableStatus(
            loginCustomer.table,
            "active" , loginCustomer.customer._id
        );

        sendTableUpdateNotification(
            loginCustomer.restaurant,
            loginCustomer.table
        );

        return res.status(200).json({
            success: true,
            tableStatus: "active",
            message: "Customer logged in successfully.",
            data: loginCustomer.customer
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

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

exports.customerPlaceOrder = async (req, res) => {
    try {
        const { restaurantName } = req.params;
        console.log('res' , restaurantName )
        const token = req.body.token
        
        if (!token) {
            return res.status(401).json({
                error: "Token is not provided",
            });
        }
        console.log('token' , token )
        console.log('body' , req.body )

        if (!restaurantName) {
            return res.status(400).json({
                error: "Restaurant name is required",
            });
        }

        const result = await orderService.customerPlaceOrder({
            restaurantName,
            token,
            body: req.body,
        });

        return res.status(201).json({
            message: "Order placed successfully",
            data: result,
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            error: error.message,
        });
    }
};