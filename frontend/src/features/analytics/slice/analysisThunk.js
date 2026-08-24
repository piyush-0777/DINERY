import { createAsyncThunk } from "@reduxjs/toolkit";
import { analysisService } from "../services/analysisService";

export const fetchOrdersAnalyticsThunk = createAsyncThunk(
  "analysis/orders",
  async (data, thunkAPI) => {

    try {
      return await analysisService.getOrders(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchRevenueThunk = createAsyncThunk(
  "analysis/revenue",
  async (data, thunkAPI) => {
    try {
      return await analysisService.getRevenue(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);



export const fetchTopItemsThunk = createAsyncThunk(
  "analysis/top",
  async (data, thunkAPI) => {
    try {
      return await analysisService.getTopItems(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchOrderTypeThunk = createAsyncThunk(
  "analysis/type",
  async (_, thunkAPI) => {
    try {
      return await analysisService.getOrderType();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);