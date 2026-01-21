import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {registerRestaurnatThunk} from "../../thunks/authThunk"


const initialState = {
    restaurant: null,
    loading: false,
    error: null,
}

export const restaurantSlice = createSlice({
    name:'restaurnat',
    initialState,
    reducers: {
        logout: (state , action) =>{
            state.restaurant = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
    builder
      .addCase(registerRestaurnatThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerRestaurnatThunk.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.restaurant = action.payload.restaurant;
        
      })
      .addCase(registerRestaurnatThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
})

export default restaurantSlice.reducer