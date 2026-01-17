const {Server} = require('socket.io')

let io;

const initSocket = (server) =>{
io = new Server(server , {
    cors: {
        origin: '*', // chang with frontend url
        methods: ["GET" , "POST"]
    }
})
}