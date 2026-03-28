import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrdersAnalyticsThunk,
  fetchRevenueThunk,
  fetchTopItemsThunk,
  fetchOrderTypeThunk,
} from "../../thunks/analysisThunk";

const initialState = {
  reqtype: null,
  loading: false,
  error: null,
};

const loadAnalysisSlice = createSlice({
  name: "loadAnalysis",
  initialState,

  reducers: {
    resetAnalysisState: (state) => {
      state.loading = false;
      state.error = null;
      state.reqtype = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchOrdersAnalyticsThunk.pending, (state) => {
        state.loading = true;
        state.reqtype = "orders";
      })

      .addCase(fetchOrdersAnalyticsThunk.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchOrdersAnalyticsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRevenueThunk.pending, (state) => {
        state.loading = true;
        state.reqtype = "revenue";
      })

      .addCase(fetchRevenueThunk.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchRevenueThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetAnalysisState } = loadAnalysisSlice.actions;
export default loadAnalysisSlice.reducer;