import { createAsyncThunk } from "@reduxjs/toolkit";
import {authService} from "../../services/authService"

export const registerRestaurnatThunk = createAsyncThunk('registerRestaurnat' , async ( data , thunkAPI)=>{
    try {
        const res = await authService.restaurantRegister(data)
        return res
    } catch (error) {
         return thunkAPI.rejectWithValue({status:error.status , message:error.data?.error});
    }
})

export const loginRestaurantThunk = createAsyncThunk('loginRestaurantThunk', async (data ,thunkAPI)=>{
    try {
        const res = await authService.ownerLogin(data);
        
        return res
    } catch(error) {
        console.log(error)
        return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})