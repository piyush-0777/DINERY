import { io } from "socket.io-client";

let socket = null;
const socketUrl = import.meta.env.VITE_SOCKET_URL;

export const connectSocket = ({ role, restaurantId,  }) => {
  if (socket) return socket; // already connected
  console.log('socket url ' , socketUrl)
  socket = io(socketUrl, {
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
