import { io } from "socket.io-client";

let socket = null;

export const connectSocket = ({ role, restaurantId,  }) => {
  if (socket) return socket; // already connected

  socket = io("http://localhost:3000", {
    auth: {
      role,
      restaurantId,
    },
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
