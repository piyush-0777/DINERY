import { createAsyncThunk } from "@reduxjs/toolkit";
import {authService} from "../../services/authService"

export const registerRestaurnatThunk = createAsyncThunk('registerRestaurnat' , async ( data)=>{
    try {
        const restaurant = await authService.restaurantRegister(data)
        return restaurant
    } catch {
        return thunkAPI.rejectWithValue(error.message || error);
    }
})