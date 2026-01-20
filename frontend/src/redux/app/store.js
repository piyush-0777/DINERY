import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/customerSlice";
import foodreducer from '../features/food/foodSlice'

export const store = configureStore({
    reducer: {customer:customerReducer, foodObject:foodreducer}
});