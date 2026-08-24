import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/authService";

export const sendOTP = createAsyncThunk(
  "otp/sendOTP",
  async ({ restaurantName, ownerEmail}, { rejectWithValue }) => {
    try {
      return await authService.sendOTP(restaurantName, ownerEmail);
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "otp/verifyOTP",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      return await authService.verifyOTP(email, otp);
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);