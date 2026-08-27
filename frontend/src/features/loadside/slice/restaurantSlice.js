import { createSlice } from "@reduxjs/toolkit";

import { loadDashbordThunk } from "./loardDashbordThunk.js";
import {
  updateRestaurantProfile,
  updateOwnerInformation,
  updateGSTNumber,
  updatePassword,
} from "../../settings";

const initialState = {
  restaurant: null,
  Last7DaysRevenue: null,
  Last7DaysOrders: [],
  subscription: null,
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,

  reducers: {
    logout: (state) => {
      state.restaurant = null;
      state.subscription = null;
    },
    addTodayOrder(state) {
      if (!state.Last7DaysOrders || state.Last7DaysOrders.length === 0) return;

      state.Last7DaysOrders[state.Last7DaysOrders.length - 1].orders += 1;
    },
    setSubscription(state, action) {
      state.subscription = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(loadDashbordThunk.fulfilled, (state, action) => {
        state.restaurant = action.payload.restaurant;
        state.Last7DaysOrders = action.payload.Last7DaysOrders;
        state.subscription =
          action.payload.subscription ||
          action.payload.data?.subscription ||
          null;
      })

      // Restaurant Profile
      .addCase(updateRestaurantProfile.fulfilled, (state, action) => {
        state.restaurant = action.payload.data;
      })

      // Owner Information
      .addCase(updateOwnerInformation.fulfilled, (state, action) => {
        state.restaurant = action.payload.data;
      })

      // GST Number
      .addCase(updateGSTNumber.fulfilled, (state, action) => {
        state.restaurant = action.payload.data;
      })

      // Password
      .addCase(updatePassword.fulfilled, () => {
        // Password update doesn't change restaurant data
      });
  },
});

export const { logout, addTodayOrder, setSubscription } = restaurantSlice.actions;

export default restaurantSlice.reducer;