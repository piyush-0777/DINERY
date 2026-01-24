import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/customerSlice";
import foodreducer from '../features/food/foodSlice'
import restauranreducer from '../features/owner/restaurantSlice'
import authreducer from '../features/owner/authSlice'
import addfoodreducer from '../features/food/addFoodSlice'
import addcategoryreducer from '../features/food/addCategorySlice'

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        foodObject: foodreducer,
        restaurant: restauranreducer,
        auth: authreducer,
        addfoodstatus:addfoodreducer,
        addcategory:addcategoryreducer,
    }
});