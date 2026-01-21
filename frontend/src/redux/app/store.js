import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/customerSlice";
import foodreducer from '../features/food/foodSlice'
import restauranreducer from'../features/owner/restaurantSlice'

export const store = configureStore({
    reducer: {customer:customerReducer, foodObject:foodreducer , restaurant:restauranreducer}
});