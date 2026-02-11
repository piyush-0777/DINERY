const orderModel = require('../models/order-model')

exports.updateOrderStatus = async (req , res) => {
 try {
    const resId =  req.restaurant._id;
    const orderId = req.params.orderId;

 if(!resId) {
  return res.status(401).json({error:'resturant is ont found'})
 }

 const {status} = req.body

 const order = await orderModel.findByIdAndUpdate(
    orderId , 
    {status} ,
    { new: true }
 )

 return res.status(200).json({
    success: true ,
    order,
 })

} catch (error) {
    console.log(error);
  return res.status(500).json({error: 'server error 121' })

}
}
