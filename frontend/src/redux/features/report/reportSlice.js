import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomerReportThunk,
  fetchDailySaleReportThunk,
  fetchGSTReportThunk,
  fetchMonthlyRevenueReportThunk,
} from "../../thunks/reportThunk";

const reportSlice = createSlice({
  name: "report",

  initialState: {
    customer: [],
    dailySale: [],
    gst: [],
    monthlyRevenue: [],
  },

  extraReducers: (builder) => {

    builder.addCase(fetchCustomerReportThunk.fulfilled, (state, action) => {
      state.customer = action.payload.data;
    });

    builder.addCase(fetchDailySaleReportThunk.fulfilled, (state, action) => {
      state.dailySale = action.payload.data;
    });

    builder.addCase(fetchGSTReportThunk.fulfilled, (state, action) => {
      state.gst = action.payload.data;
    });

    builder.addCase(fetchMonthlyRevenueReportThunk.fulfilled, (state, action) => {
      state.monthlyRevenue = action.payload.data;
    });

  },
});

export default reportSlice.reducer;