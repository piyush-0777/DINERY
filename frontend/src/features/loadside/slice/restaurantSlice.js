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
};

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,

  reducers: {
    logout: (state) => {
      state.restaurant = null;
    },
    addTodayOrder(state) {
      if (state.last7DaysOrders.length === 0) return;

      state.last7DaysOrders[state.last7DaysOrders.length - 1].orders += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      // Dashboard
      .addCase(loadDashbordThunk.fulfilled, (state, action) => {
        state.restaurant = action.payload.restaurant;
        state.Last7DaysOrders = action.payload.Last7DaysOrders
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
      .addCase(updatePassword.fulfilled, (state) => {
        // Password update doesn't change restaurant data
      });
  },
});

export const { logout , addTodayOrder } = restaurantSlice.actions;

export default restaurantSlice.reducer;