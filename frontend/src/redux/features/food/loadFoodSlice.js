import { createSlice } from "@reduxjs/toolkit";
import {addFoodThunk , deletFoodThunk , updateFoodThunk} from '../../thunks/manuThunk'


const initialState = {
    reqtype:null,
    loading: false,
    success: false,
    error: null,
}


const loadFoodSlice = createSlice({
  name: "loadFood",
  initialState,
  reducers: {
    resetAddFoodState: (state) => {
      state.reqtype = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFoodThunk.pending, (state) => {
        state.reqtype = 'addfood';
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addFoodThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addFoodThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletFoodThunk.pending, (state) => {
        state.reqtype = 'deletfood';
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deletFoodThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deletFoodThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateFoodThunk.pending, (state) => {
        state.reqtype = 'editfood';
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateFoodThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateFoodThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAddFoodState } = loadFoodSlice.actions;
export default loadFoodSlice.reducer;
