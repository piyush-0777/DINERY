import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomerReportThunk,
  fetchDailySaleReportThunk,
  fetchGSTReportThunk,
  fetchMonthlyRevenueReportThunk,
} from "../../thunks/reportThunk";

const initialState = {
  reqtype: null,
  loading: false,
  error: null,
};

const loadReportSlice = createSlice({
  name: "loadReport",
  initialState,

  reducers: {
    resetReportState: (state) => {
      state.loading = false;
      state.error = null;
      state.reqtype = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= Customer =================
      .addCase(fetchCustomerReportThunk.pending, (state) => {
        state.loading = true;
        state.reqtype = "customer";
      })
      .addCase(fetchCustomerReportThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCustomerReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Daily Sale =================
      .addCase(fetchDailySaleReportThunk.pending, (state) => {
        state.loading = true;
        state.reqtype = "dailySale";
      })
      .addCase(fetchDailySaleReportThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchDailySaleReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= GST =================
      .addCase(fetchGSTReportThunk.pending, (state) => {
        state.loading = true;
        state.reqtype = "gst";
      })
      .addCase(fetchGSTReportThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchGSTReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Monthly Revenue =================
      .addCase(fetchMonthlyRevenueReportThunk.pending, (state) => {
        state.loading = true;
        state.reqtype = "monthlyRevenue";
      })
      .addCase(fetchMonthlyRevenueReportThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchMonthlyRevenueReportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export const { resetReportState } = loadReportSlice.actions;
export default loadReportSlice.reducer;