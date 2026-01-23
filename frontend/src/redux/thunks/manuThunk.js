import { createAsyncThunk } from "@reduxjs/toolkit";

import {menuService} from "../../services/manuService"

export const addFoodThunk =createAsyncThunk('addFoodThunk' ,async (data , thunkAPI)=>{
    try {
      const res =await  menuService.addMenuItem(data);
      
      return res;
    } catch (error) {
        console.log(error)
        return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})