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
});

export const deletFoodThunk = createAsyncThunk('deletFoodThunk', async (data , thunkAPI)=>{
    try {
const res = await menuService.deleteMenuItem(data);
    return data;
    } catch (error){
         return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})

export const updateFoodThunk = createAsyncThunk('updateFoodThunk', async (data , thunkAPI)=>{
    try {
const res = await menuService.updateMenuItem(data._id , data);
    return res;
    } catch (error){
         return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})


export const addCategoryThunk = createAsyncThunk('addCategoryThunk' ,
     async (data, thunkAPI)=>{
    try{
        const res = await menuService.addCategory(data);
      
        return res;
    } catch (error) {
         console.log(error)
        return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})