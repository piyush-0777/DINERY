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

export const updateFoodThunk = createAsyncThunk('updateFoodThunk', async ({id , data} , thunkAPI)=>{
    try {
        console.log('data' , { id , data})
const res = await menuService.updateMenuItem(id ,  data);
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

export const deletCategoryThunk = createAsyncThunk('deletCategoryThunk', async (data , thunkAPI)=>{
    try {
const res = await menuService.deleteCategory(data);
    return data;
    } catch (error){
         return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})

export const editCategoryThunk = createAsyncThunk('editCategoryThunk' , async ({id , data} , thunkAPI)=>{
    try {
    const res = await menuService.updateCategory(id ,  data);
     return res;
    } catch (error){
         return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
    }
})