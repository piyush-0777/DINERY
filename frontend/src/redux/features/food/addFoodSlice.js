import { createSlice } from "@reduxjs/toolkit";
import {addFoodThunk} from '../../thunks/manuThunk'

const initialState = {
    loading: false,
    success: false,
    error: null,
}


const addFoodSlice = createSlice({
  name: "addFood",
  initialState,
  reducers: {
    resetAddFoodState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFoodThunk.pending, (state) => {
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
      });
  },
});

export const { resetAddFoodState } = addFoodSlice.actions;
export default addFoodSlice.reducer;
