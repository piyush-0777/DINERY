import { createAsyncThunk } from "@reduxjs/toolkit";
import { settingService } from "../services/settingService";

// Update Restaurant Profile
export const updateRestaurantProfile = createAsyncThunk(
  "setting/updateRestaurantProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await settingService.updateRestaurantProfile(formData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.data
      );
    }
  }
);

// Update Owner Information
export const updateOwnerInformation = createAsyncThunk(
  "setting/updateOwnerInformation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingService.updateOwnerInformation(data);
      return response;
    } catch (error) {
      return rejectWithValue(
         error?.data
      );
    }
  }
);

// Update GST Number
export const updateGSTNumber = createAsyncThunk(
  "setting/updateGSTNumber",
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingService.updateGSTNumber(data);
      return response;
    } catch (error) {
      return rejectWithValue(
         error?.data
      );
    }
  }
);

// Update Password
export const updatePassword = createAsyncThunk(
  "setting/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingService.updatePassword(data);
      return response;
    } catch (error) {
      return rejectWithValue(
         error?.data
      );
    }
  }
);