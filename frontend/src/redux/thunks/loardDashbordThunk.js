import { ownerService } from "../../services/ownerService";

import { createAsyncThunk } from "@reduxjs/toolkit";


export const loadDashbordThunk = createAsyncThunk('loadDashbordThunk', async (data , thunkAPI)=>{
    try {
        const res = await ownerService.getRestaurantDashboard(data) 
        console.log(res)
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})