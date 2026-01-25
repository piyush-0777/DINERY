import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customer/customerSlice";
import foodreducer from '../features/food/foodSlice'
import restauranreducer from '../features/owner/restaurantSlice'
import authreducer from '../features/owner/authSlice'
import loadfoodreducer from '../features/food/loadFoodSlice'
import addcategoryreducer from '../features/food/addCategorySlice'
import loarddashbordreducer from '../features/owner/loadDashbordSlice'

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        foodObject: foodreducer,
        restaurant: restauranreducer,
        auth: authreducer,
        loadfoodstatus:loadfoodreducer,
        addcategory:addcategoryreducer,
        loardDashbordState:loarddashbordreducer,
    }
});