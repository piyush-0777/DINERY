import { io } from "socket.io-client";
import {addSocketId} from '../redux/features/owner/socketSlice'
import { useDispatch } from "react-redux";
const socketUrl = import.meta.env.VITE_SOCKET_URL;
let socket = null;

export const connectSocket = ({ role, restaurantId, customerId  }) => {

  if (socket) return socket; // already connected
  console.log('socket url ' , socketUrl)
  socket = io(socketUrl , {
    auth: {
      role,
      restaurantId,
      customerId
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
