import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../services/adminService";

export const getAdminStatsThunk = createAsyncThunk(
  "admin/getAdminStatsThunk",
  async (_, thunkAPI) => {
    try {
      const res = await adminService.getStats();
      return res.data?.stats || res.stats || res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const getAllRestaurantsThunk = createAsyncThunk(
  "admin/getAllRestaurantsThunk",
  async (_, thunkAPI) => {
    try {
      const res = await adminService.getAllRestaurants();
      return res.data?.restaurants || res.restaurants || res.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const getPricingThunk = createAsyncThunk(
  "admin/getPricingThunk",
  async (_, thunkAPI) => {
    try {
      const res = await adminService.getPricing();
      return res.data?.plans || res.plans || res.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const updatePricingThunk = createAsyncThunk(
  "admin/updatePricingThunk",
  async ({ planKey, data }, thunkAPI) => {
    try {
      const res = await adminService.updatePricing(planKey, data);
      return res.data?.plan || res.plan || res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const grantPremiumThunk = createAsyncThunk(
  "admin/grantPremiumThunk",
  async ({ restaurantId, data }, thunkAPI) => {
    try {
      const res = await adminService.grantPremium(restaurantId, data);
      return res.data?.restaurant || res.restaurant || res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const getAllUsersThunk = createAsyncThunk(
  "admin/getAllUsersThunk",
  async (_, thunkAPI) => {
    try {
      const res = await adminService.getAllUsers();
      return res.data?.users || res.users || res.data || [];
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const createRestaurantThunk = createAsyncThunk(
  "admin/createRestaurantThunk",
  async (formData, thunkAPI) => {
    try {
      const res = await adminService.createRestaurant(formData);
      return res.data?.restaurant || res.restaurant || res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const deleteRestaurantThunk = createAsyncThunk(
  "admin/deleteRestaurantThunk",
  async (restaurantId, thunkAPI) => {
    try {
      await adminService.deleteRestaurant(restaurantId);
      return restaurantId;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);

export const revokePremiumThunk = createAsyncThunk(
  "admin/revokePremiumThunk",
  async (restaurantId, thunkAPI) => {
    try {
      const res = await adminService.revokePremium(restaurantId);
      return res.data?.restaurant || res.restaurant || res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        status: error.status || 500,
        message: error.data?.message || error.message,
      });
    }
  }
);
