const orderModel = require('../models/order-model')
const orderService = require("../services/orderService");
const {sendOrderStatusUpdateNotificationToCustomer} = require("../socket/socketEvent")
exports.updateOrderStatus = async (req, res) => {
  try {
    const restaurantId = req.restaurant?._id;
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(
      restaurantId,
      orderId,
      status
    );
    
    sendOrderStatusUpdateNotificationToCustomer(order.customer , order?._id , status );
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderById = async (req , res) => {
   try {
   const orderId = req.params.orderId;
   const order = await orderModel.findById(orderId)
   .populate('table')
  .populate('customer')
   res.status(200).json({
      success: true ,
    order,
   })
   } catch(error) {
      console.log(error);
  return res.status(500).json({error: 'server error 121' })

   }

}
