
const customer = require('../models/customer-model')
const restaurantModel = require('../models/restaurant-model')

exports.customerLogin = async (req , res) =>{
const {name , phone} = req.body
const {restaurantName } = req.params;
console.log("Original URL:", req.originalUrl);
console.log("Path:", req.path);
console.log("Method:", req.method);
console.log('res id',req.params)
console.log(restaurantName)
const restaurant = await restaurantModel.findOne({restaurantName})
console.log(restaurant)
const loginCustomer = await customer.create({
    restaurant:restaurant._id,
    name ,
    phone,
})

if(loginCustomer) {
    res.status(200).json({message: 'loged in.' , data:loginCustomer})
} else {
    res.status(400).json({error: 'error in login'})
}

}