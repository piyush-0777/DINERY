import { useEffect } from "react";
import { useSelector } from "react-redux";
import { connectSocket, getSocket } from "../socket/ownerSocket";

const useSocket = () => {
  const restaurant = useSelector(
    (state) => state.restaurant.restaurant
  );

  const customer = useSelector(
    (state) => state.customer.customer
  );

  useEffect(() => {
    // already connected → do nothing
    if (getSocket()) return;

    let role = null;
    let restaurantId = null;

    // OWNER
    if (restaurant?._id) {
      role = "owner";
      restaurantId = restaurant._id;
    }

    // CUSTOMER
    else if (customer?.restaurant) {
      role = "customer";
      restaurantId = customer.restaurant;
    }

    if (!role || !restaurantId) return;

    connectSocket({ role, restaurantId });

  }, [restaurant?._id, customer?.restaurant]);
};

export default useSocket;
