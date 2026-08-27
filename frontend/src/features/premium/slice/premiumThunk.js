import { createAsyncThunk } from "@reduxjs/toolkit";
import { premiumService } from "../services/premiumService";

export const getPlansThunk = createAsyncThunk(
  "premium/getPlansThunk",
  async (_, thunkAPI) => {
    try {
      const res = await premiumService.getPlans();
      return res.data?.plans || res.plans || res.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const getSubscriptionStatusThunk = createAsyncThunk(
  "premium/getSubscriptionStatusThunk",
  async (_, thunkAPI) => {
    try {
      const res = await premiumService.getStatus();
      return res.data || res;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const createOrderThunk = createAsyncThunk(
  "premium/createOrderThunk",
  async (orderPayload, thunkAPI) => {
    try {
      const res = await premiumService.createOrder(orderPayload);
      return res.data || res;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const verifyPaymentThunk = createAsyncThunk(
  "premium/verifyPaymentThunk",
  async (paymentPayload, thunkAPI) => {
    try {
      const res = await premiumService.verifyPayment(paymentPayload);
      return res.data || res;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const activateSubscriptionThunk = createAsyncThunk(
  "premium/activateSubscriptionThunk",
  async (payload, thunkAPI) => {
    try {
      const res = await premiumService.activateSubscription(payload);
      return res.data || res;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);
