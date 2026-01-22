import { createSlice } from "@reduxjs/toolkit";
import {registerRestaurnatThunk, loginRestaurantThunk} from "../../thunks/authThunk"

const initialState = {
    authStatus: 'logout',
    message: null,
    loading: false,
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
                state.loading = true;
                state.error = null;
            })
            .addCase(registerRestaurnatThunk.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false;
                state.message = action.payload.message;
                state.authStatus = "login"

            })
            .addCase(registerRestaurnatThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // for login
            .addCase(loginRestaurantThunk.pending , (state)=>{
                state.loading= true;
                state.error = null;
            })
            .addCase(loginRestaurantThunk.fulfilled , (state , action)=>{
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(loginRestaurantThunk.rejected , (state , action)=>{
                state.loading = false;
               state.error = action.payload ?? {
                            status: 500,
                            message: action.error.message,
                                };
            })
    }


})

export const {logout} =authSlice.actions;

export default authSlice.reducer;