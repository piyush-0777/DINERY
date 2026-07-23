import { createSlice } from "@reduxjs/toolkit";
import {
  updateRestaurantProfile,
  updateOwnerInformation,
  updateGSTNumber,
  updatePassword,
} from "../../thunks/settingThunk.js";

const initialState = {
  reqtype: null,
  loading: false,
  success: false,
  error: null,
};

const settingLoadSlice = createSlice({
  name: "settingLoad",
  initialState,

  reducers: {
    resetSettingLoadState: (state) => {
      state.reqtype = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Update Restaurant Profile
      .addCase(updateRestaurantProfile.pending, (state) => {
        state.reqtype = "updateRestaurantProfile";
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateRestaurantProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateRestaurantProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Owner Information
      .addCase(updateOwnerInformation.pending, (state) => {
        state.reqtype = "updateOwnerInformation";
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateOwnerInformation.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateOwnerInformation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update GST Number
      .addCase(updateGSTNumber.pending, (state) => {
        state.reqtype = "updateGSTNumber";
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateGSTNumber.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateGSTNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Password
      .addCase(updatePassword.pending, (state) => {
        state.reqtype = "updatePassword";
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSettingLoadState } = settingLoadSlice.actions;

export default settingLoadSlice.reducer;