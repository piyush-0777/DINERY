// useSocket.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "../redux/thunks/initThunk";

const useSocket = () => {
  const dispatch = useDispatch();

  const restaurantId = useSelector(
    (state) => state.restaurant.restaurant?._id
  );

  const customerRestaurant = useSelector(
    (state) => state.customer.customer?.restaurant
  );

  useEffect(() => {
    let role = null;
    let finalRestaurantId = null;

    if (restaurantId) {
      role = "owner";
      finalRestaurantId = restaurantId;
    } else if (customerRestaurant) {
      role = "customer";
      finalRestaurantId = customerRestaurant;
    }

    if (!role || !finalRestaurantId) return;

    dispatch(initSocket({ role, restaurantId: finalRestaurantId }));

  }, [restaurantId, customerRestaurant, dispatch]);
};

export default useSocket;
