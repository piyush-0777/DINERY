import { createSlice } from "@reduxjs/toolkit";
import {
  getPlansThunk,
  getSubscriptionStatusThunk,
  activateSubscriptionThunk,
  verifyPaymentThunk,
} from "./premiumThunk";

const initialState = {
  plans: [],
  currentSubscription: {
    isSubscriptionActive: true,
    status: "trial",
    plan: "trial",
    daysLeft: 7,
    expiresAt: null,
  },
  currency: "INR", // 'INR' or 'USD'
  loading: false,
  error: null,
};

const premiumSlice = createSlice({
  name: "premium",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    resetPremiumError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // getPlansThunk
    builder
      .addCase(getPlansThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlansThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(getPlansThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

    // getSubscriptionStatusThunk
    builder
      .addCase(getSubscriptionStatusThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscriptionStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = action.payload;
      })
      .addCase(getSubscriptionStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

    // verifyPaymentThunk
    builder
      .addCase(verifyPaymentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = {
          ...state.currentSubscription,
          isSubscriptionActive: true,
          status: "active",
          plan: action.payload.subscription?.plan || "premium",
          daysLeft: action.payload.subscription?.days || 30,
          expiresAt: action.payload.subscription?.expiresAt,
        };
      })
      .addCase(verifyPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });

    // activateSubscriptionThunk
    builder
      .addCase(activateSubscriptionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateSubscriptionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSubscription = {
          ...state.currentSubscription,
          isSubscriptionActive: true,
          status: "active",
          plan: action.payload.subscription?.plan || "premium",
          daysLeft: action.payload.subscription?.days || 30,
          expiresAt: action.payload.subscription?.expiresAt,
        };
      })
      .addCase(activateSubscriptionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { setCurrency, resetPremiumError } = premiumSlice.actions;
export const premiumReducer = premiumSlice.reducer;
