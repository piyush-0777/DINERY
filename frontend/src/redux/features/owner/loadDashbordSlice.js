import { createSlice } from "@reduxjs/toolkit";
import {loadDashbordThunk} from '../../thunks/loardDashbordThunk'

const initialState = {
    loading: false,
    success: false,
    error: null,
}


const loadDashbordSlice = createSlice({
  name: "addFood",
  initialState,
  reducers: {
    resetloadDashbordSliceState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDashbordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loadDashbordThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(loadDashbordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetloadDashbordSliceState } = loadDashbordSlice.actions;
export default loadDashbordSlice.reducer;
