import { createSlice } from "@reduxjs/toolkit";
import {
  getAdminStatsThunk,
  getAllRestaurantsThunk,
  getAllUsersThunk,
  getPricingThunk,
  updatePricingThunk,
  grantPremiumThunk,
  createRestaurantThunk,
  deleteRestaurantThunk,
  revokePremiumThunk,
} from "./adminThunk";

const initialState = {
  stats: {
    totalRestaurants: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
  },
  restaurants: [],
  users: [],
  pricing: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Stats
    builder
      .addCase(getAdminStatsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminStatsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(getAdminStatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

    // Restaurants
    builder
      .addCase(getAllRestaurantsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRestaurantsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getAllRestaurantsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

    // Users
    builder
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
      });

    // Pricing
    builder
      .addCase(getPricingThunk.fulfilled, (state, action) => {
        state.pricing = action.payload;
      })
      .addCase(updatePricingThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.pricing.findIndex((p) => p.planKey === updated.planKey);
        if (index !== -1) {
          state.pricing[index] = updated;
        }
      });

    // Grant Premium
    builder.addCase(grantPremiumThunk.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.restaurants.findIndex((r) => r._id === updated._id);
      if (index !== -1) {
        state.restaurants[index] = updated;
      }
    });

    // Revoke Premium
    builder.addCase(revokePremiumThunk.fulfilled, (state, action) => {
      const updated = action.payload;
      const index = state.restaurants.findIndex((r) => r._id === updated._id);
      if (index !== -1) {
        state.restaurants[index] = updated;
      }
    });

    // Create Restaurant Owner
    builder.addCase(createRestaurantThunk.fulfilled, (state, action) => {
      state.restaurants.unshift(action.payload);
      state.stats.totalRestaurants += 1;
    });

    // Delete Restaurant
    builder.addCase(deleteRestaurantThunk.fulfilled, (state, action) => {
      state.restaurants = state.restaurants.filter((r) => r._id !== action.payload);
      state.stats.totalRestaurants = Math.max(0, state.stats.totalRestaurants - 1);
    });
  },
});

export const { resetAdminError } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
