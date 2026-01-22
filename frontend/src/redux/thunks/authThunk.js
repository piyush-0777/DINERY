import { createAsyncThunk } from "@reduxjs/toolkit";
import {authService} from "../../services/authService"

export const registerRestaurnatThunk = createAsyncThunk('registerRestaurnat' , async ( data , thunkAPI)=>{
    try {
        const restaurant = await authService.restaurantRegister(data)
        return restaurant
    } catch {
        return thunkAPI.rejectWithValue(error.message || error);
    }
})

export const loginRestaurantThunk = createAsyncThunk('loginRestaurantThunk', async (data ,thunkAPI)=>{
    try {
        const res = await authService.ownerLogin(data);
        console.lgo(res)
        return res
    } catch(error) {
        return thunkAPI.rejectWithValue({status:error.status , data:error.data?.error});
    }
})