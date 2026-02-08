import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  connectSocket,
  disconnectSocket,
} from "../consfig/socket";

const useSocket = () => {
  console.log('hello')
    let role;
    let restaurantId;
  const restaurant = useSelector(
    (state) => state.restaurant.restaurant
  );
  console.log(restaurant);
  const customer = useSelector(
    (state) => state.customer.customer
  );

  if(restaurant._id) {
    restaurantId = restaurant?._id
    role = 'owner'
  } else if(customer) {
    restaurantId = customer?.restaurant
    role = 'customer'
  } else {
    console.log('res or customer is not find')
  }

  console.log('socket' , { role, restaurantId })
  useEffect(() => {
    if ( role && restaurantId) {
      connectSocket({ role, restaurantId });
    }

    return () => {
      disconnectSocket();
    };
  }, [ role, restaurantId]);
};

export default useSocket;
