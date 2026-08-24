import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportService } from "../services/reportService";


// =========================
// Customer Report
// =========================
export const fetchCustomerReportThunk = createAsyncThunk(
  "report/customer",
  async (_, thunkAPI) => {
    try {
      return await reportService.getCustomerReport();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


// =========================
// Daily Sale Report
// =========================
export const fetchDailySaleReportThunk = createAsyncThunk(
  "report/dailySale",
  async (_, thunkAPI) => {
    try {
      return await reportService.getDailySaleReport();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


// =========================
// GST Report
// =========================
export const fetchGSTReportThunk = createAsyncThunk(
  "report/gst",
  async (_, thunkAPI) => {
    try {
      return await reportService.getGSTReport();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);


// =========================
// Monthly Revenue Report
// =========================
export const fetchMonthlyRevenueReportThunk = createAsyncThunk(
  "report/monthlyRevenue",
  async (_, thunkAPI) => {
    try {
      return await reportService.getMonthlyRevenueReport();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);