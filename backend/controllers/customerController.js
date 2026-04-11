
const customer = require('../models/customer-model')
const restaurantModel = require('../models/restaurant-model')
const tableModel = require('../models/table-model')
const foodModel = require('../models/food-model')
const categoryModel = require('../models/categories-model')
const orderModel = require('../models/order-model')
const billModel = require('../models/bill-model')
const customerService = require('../services/customerService')

const {sendNewOrderNotification , sendTableUpdateNotification} = require('../socket/socketEvent')


exports.customerLogin = async (req, res) => {
    try {
     

        const { name, phone } = req.body
        const { restaurantName } = req.params;
         const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
         console.log('token' , token , restaurantName);
         

        if (!token) {
            return res.status(404).json({ error: 'token is not provide' });
        }

        const loginCustomer = await customerService.loginCustomer(restaurantName, token , name , phone)
        if(loginCustomer === false) {
            console.log("i am run");
            return res.status(402).json({ error : 'table is occupied' });

        }

         const result = sendTableUpdateNotification(loginCustomer.restaurant , loginCustomer.table);

        
         
        res.status(200).json({ message: 'loged in.', data: loginCustomer })
      
          
    } catch (error) {
        console.log('from',error)
        return res.status(401).json({ error: error});
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

exports.customerPlaceOrder = async (req, res) => {
    try {
        const { restaurantName } = req.params;
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];


        if (!token) {
            return res.status(401).json({ error: 'token is not provide' });
        }
        if (!restaurantName) {
            return res.status(401).json({ error: 'restaurantName is not provide' });
        }
        const table = await tableModel.findOne({ qrCode: token })
        const restaurant = await restaurantModel.findOne({ restaurantName })
        const { orders, customer } = req.body;
        let totalAmount = 0;
        console.log(table)
        console.log(token)

        orders.items.map(e => {
            totalAmount += e.subtotal
        })
        const createdOrder = await orderModel.create({
            restaurant: restaurant._id,
            customer: customer._id,
            table: table._id,
            items: orders.items,
            totalAmount
        })
        const bill = await billModel.create({
            restaurant:restaurant._id,
              order: createdOrder._id,
              billAmount: totalAmount,
              tax: 5,
              finalAmount: totalAmount + (totalAmount*0.05),
              paymentStatus: "unpaid"
        })

        const result = await sendNewOrderNotification(restaurant._id , createdOrder , bill)
        res.status(200).json({
            message: 'order is plased',
            data: {createdOrder , bill} ,
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: ' server error' });

    }
}