const {getIO} = require('./socketServer')


exports.sendNewOrderNotification = (restaurantID , order)=>{
    getIO().to(restaurantID).emit('newOrder' , order)
}

exports.sendOrderStatusUpdate = (restaurantId, orderId, status) => {
  getIO().to(restaurantId).emit("orderStatusUpdated", {
    orderId,
    status
  });
};