import { connectSocket } from "../../../consfig/socket";
import { addSocketId } from "./socketSlice";

export const initSocket = ({ role, restaurantId , customerId }) => {
  return (dispatch) => {
    const socket = connectSocket({ role, restaurantId , customerId });

    socket.on("connect", () => {
      dispatch(addSocketId(socket.id));
      console.log("Socket ID saved in Redux:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };
};
