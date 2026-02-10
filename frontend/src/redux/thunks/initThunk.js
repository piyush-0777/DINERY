import { connectSocket } from "../../consfig/socket";
import { addSocketId } from "../features/owner/socketSlice";

export const initSocket = ({ role, restaurantId }) => {
  return (dispatch) => {
    const socket = connectSocket({ role, restaurantId });

    socket.on("connect", () => {
      dispatch(addSocketId(socket.id));
      console.log("Socket ID saved in Redux:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  };
};
