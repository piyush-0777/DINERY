const { Server } = require("socket.io");

let io;

// restaurantId -> Set(socketId)
const onlineOwners = new Map();

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connect", (socket) => {
    const { restaurantId, role, customerId } = socket.handshake.auth;

    if (!restaurantId || !role) {
      socket.disconnect();
      return;
    }

    // OWNER LOGIC
    if (role === "owner") {
      socket.join(restaurantId);

      if (!onlineOwners.has(restaurantId)) {
        onlineOwners.set(restaurantId, new Set());
      }

      onlineOwners.get(restaurantId).add(socket.id);

      //  console.log("Owner ONLINE:", restaurantId);
    }

    // CUSTOMER LOGIC
    else if (role === "customer") {
     
      if (!customerId) {
        socket.disconnect();
        return;
      }
       console.log(role, customerId)
      const owners = onlineOwners.get(restaurantId);

      if (!owners || owners.size === 0) {
        socket.emit("serviceUnavailable");
        socket.disconnect();
        return;
      }

      // Restaurant room
      socket.join(restaurantId);

      // Private customer room
      socket.join(`customer:${customerId}`);

        console.log(`Customer ${customerId} joined`);
    }

    socket.on("disconnect", () => {
      if (role === "owner") {
        const owners = onlineOwners.get(restaurantId);

        if (owners) {
          owners.delete(socket.id);

          if (owners.size === 0) {
            onlineOwners.delete(restaurantId);
            // console.log("Restaurant OFFLINE:", restaurantId);
          }
        }
      }

      // console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }

  return io;
};

module.exports = { initSocket, getIO };