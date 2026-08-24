import { createSlice } from "@reduxjs/toolkit";
import {registerRestaurnatThunk, loginRestaurantThunk} from "./authThunk"

const initialState = {
    success: false,
    message: null,
    error: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.authStatus = 'log out';
        }
    },
    extraReducers: (builder) => {

        //for register restaurantThunk
        builder
            .addCase(registerRestaurnatThunk.pending, (state) => {
                state.error = null;
            })
            .addCase(registerRestaurnatThunk.fulfilled, (state, action) => {
                state.message = action.payload.message;

            })
            .addCase(registerRestaurnatThunk.rejected, (state, action) => {
                state.error = action.payload;
            })

            // for login
            .addCase(loginRestaurantThunk.pending , (state)=>{
                state.error = null;
            })
            .addCase(loginRestaurantThunk.fulfilled , (state , action)=>{
                state.message = action.payload.message;
                state.success= true;
            })
            .addCase(loginRestaurantThunk.rejected , (state , action)=>{
               state.error = action.payload ?? {
                            status: 500,
                            message: action.error.message,
                                };
            })
    }


})

export const {logout} =authSlice.actions;

export default authSlice.reducer;