const {getIO} = require('./socketServer')

// for order
exports.sendNewOrderNotification = async (restaurantID , order , bill , tableId)=>{
  try {
 getIO().to(restaurantID.toString()).emit('newOrder' , {orderId:order._id , billId:bill._id , tableId:tableId})
 
 return true;
  } catch (error) {
    console.log('socket error' , error)
    return false;
  }
   
}

exports.sendOrderStatusUpdateNotification = (restaurantId, orderId, status) => {
  getIO().to(restaurantId).emit("orderStatusUpdated", {
    orderId,
    status
  });
};

exports.sendOrderStatusUpdateNotificationToCustomer = (customerId ,orderId , status) => {
  getIO().to(`customer:${customerId}`).emit("orderStatusUpdated" , {
    orderId,
    status

  })
}

exports.sendBillStatusUpdateNotificationToCustomer = (customerId ,billId , status) => {
  getIO().to(`customer:${customerId}`).emit("BillStatusUpdated" , {
    billId,
    status

  })
}

// for tables

exports.sendTableUpdateNotification = (restaurantID , tableId ) =>{
  try {
getIO().to(restaurantID.toString()).emit('tableStatusUpdated', tableId)
return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}