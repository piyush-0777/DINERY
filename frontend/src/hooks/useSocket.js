// useSocket.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "../features/loadside/slice/initThunk";

const useSocket = (enabled = true) => {
  const dispatch = useDispatch();

  const restaurantId = useSelector((state) => state.restaurant.restaurant?._id);

  const customerRestaurant = useSelector(
    (state) => state.customer.customer?.restaurant,
  );
  const customerId = useSelector((state) => state.customer.customer?._id);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    let role = null;
    let finalRestaurantId = null;
    let finalCustomerId = null;

    if (restaurantId) {
      role = "owner";
      finalRestaurantId = restaurantId;
    } else if (customerRestaurant) {
      role = "customer";
      finalRestaurantId = customerRestaurant;
      finalCustomerId = customerId;
    }

    if (!role || !finalRestaurantId) return;

    dispatch(
      initSocket({
        role,
        restaurantId: finalRestaurantId,
        customerId: finalCustomerId,
      }),
    );
  }, [enabled, restaurantId, customerRestaurant, dispatch]);
};

export default useSocket;
