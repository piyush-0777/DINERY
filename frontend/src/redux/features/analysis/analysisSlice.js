import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrdersAnalyticsThunk,
  fetchRevenueThunk,
  fetchTopItemsThunk,
  fetchOrderTypeThunk,
} from "../../thunks/analysisThunk";

const analysisSlice = createSlice({
  name: "analysis",

  initialState: {
    orders: [],
    revenue: [],
    top: [],
    type: [],
  },
  

  extraReducers: (builder) => {

    builder.addCase(fetchOrdersAnalyticsThunk.fulfilled, (state, action) => {
      state.orders = action.payload.data;
    });

    builder.addCase(fetchRevenueThunk.fulfilled, (state, action) => {
      state.revenue = action.payload.data;
    });

    // builder.addCase(fetchPeakThunk.fulfilled, (state, action) => {
    //   state.peak = action.payload.data;
    // });

    builder.addCase(fetchTopItemsThunk.fulfilled, (state, action) => {
      state.top = action.payload.data;
    });

    builder.addCase(fetchOrderTypeThunk.fulfilled, (state, action) => {
      state.type = action.payload.data;
    });

  },
});

export default analysisSlice.reducer;