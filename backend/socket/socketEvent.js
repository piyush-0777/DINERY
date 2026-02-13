const {getIO} = require('./socketServer')

// for order
exports.sendNewOrderNotification = async (restaurantID , order , bill)=>{
  try {
 getIO().to(restaurantID.toString()).emit('newOrder' , {orderId:order._id , billId:bill._id})
 
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