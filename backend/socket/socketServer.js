const { Server } = require("socket.io");

let io;

// Track online owners per restaurant
const onlineOwners = new Map(); 
// restaurantId -> Set(socketId)

const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connect", (socket) => {
    // console.log("client connected", socket.id);

    const { restaurantId, role } = socket.handshake.auth;

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

      // console.log("Owner ONLINE for restaurant:", restaurantId);
    }

    // CUSTOMER LOGIC
    else if (role === "customer") {
      const owners = onlineOwners.get(restaurantId);

      if (!owners || owners.size === 0) {
        socket.emit("serviceUnavailable");
        socket.disconnect();
        return;
      }

      socket.join(restaurantId);
      // console.log("Customer joined restaurant:", restaurantId);
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
      // console.log("client disconnected", socket.id);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error("Socket not initialized");
  return io;
};

module.exports = { initSocket, getIO };
