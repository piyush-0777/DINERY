import { LoardDashbordService } from "../services/loardDashbordService";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const loadDashbordThunk = createAsyncThunk('loadDashbordThunk', async (_ , thundkAPI)=>{
    try {
        const res = await LoardDashbordService.getRestaurantDashboard() 
        console.log(res)
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})