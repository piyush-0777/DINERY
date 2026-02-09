const {getIO} = require('./socketServer')


exports.sendNewOrderNotification = async (restaurantID , order)=>{
  try {
    console.log(restaurantID.toString())
    console.log(order)
 getIO().to(restaurantID.toString()).emit('newOrder' , order)
 console.log('notification is send')
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