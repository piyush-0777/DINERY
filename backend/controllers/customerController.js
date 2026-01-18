
const customer = require('../models/customer-model')

exports.customerLogin = async (req , res) =>{
const {name , phone} = req.body
const {restaurantId , tableId} = req.params;
console.log("Original URL:", req.originalUrl);
console.log("Path:", req.path);
console.log("Method:", req.method);
console.log('res id',req.params)

const loginCustomer = await customer.create({
    restaurant:restaurantId ,
    name ,
    phone,
})

if(loginCustomer) {
    res.status(200).json({message: 'loged in.'})
} else {
    res.status(400).json({error: 'error in login'})
}

}