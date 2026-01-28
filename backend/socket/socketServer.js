const { Server, Socket } = require('socket.io')

let io;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*', // chang with frontend url
        }
    })


    io.on("connection", (socket) => {
        console.log("new clint connected", socket.id);
        const { restaurantId, role } = socket.handshake.auth;

        if (role == 'owner') {
            socket.join(restaurantId);
            console.log('owner createrd and jion room', restaurantId)
        } else if (roll == 'customer') {
            const room = io.socket.adapter.rooms.get(restaurantId)
            if (!room) {
                socket.emit("service Unavailable");
            } else {
                socket.join(room)
            }
        } else {
            socket.emit("this roll is unavailable")
        }

    })
    return io;
}

const getIO =() =>{
    if(!io){
        throw new Error("socket.io is not initialized!")
    } else {
        return io
    }
}

module.exports = {initSocket , getIO}
