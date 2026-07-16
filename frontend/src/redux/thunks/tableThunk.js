import { createAsyncThunk } from "@reduxjs/toolkit";
import {tableService} from '../../services/tableService'

export const addTableThunk = createAsyncThunk('addTableThunk' , async (data , thunkAPI) => {
    try {
        const res = await tableService.addTable(data);
        return res
    } catch (error) {
         console.log(error)
        return thunkAPI.rejectWithValue({ status: error.status || 500, message: error.data?.error || error.message });
    }
})

export const deleteTableThunk = createAsyncThunk('deleteTableThunk' , async (id , thunkAPI)=>{
    try {
        const res = await tableService.deleteTable(id)
        return res
    } catch (error) {
        console.log(error) 
        return thunkAPI.rejectWithValue({status:error.status || 500 , message: error.data?.error || error.message})
    }
})

export const updateTableThunk = createAsyncThunk('updateTableThunk' , async ({id , data} , thunkAPI)=>{
    try {
        const res = await tableService.updateTable(id , data);
        return res;

    } catch (error) {
        console.log(error) 
        return thunkAPI.rejectWithValue({status:error.status || 500 , message: error.data?.error || error.message})
    }
})

export const updateStatusThunk = createAsyncThunk('updateStatusThunk' , async ({id , status , customer = null }, thunkAPI)=>{
    try {
        const res  = await tableService.updateStatus(id , { status , customer}) 
        console.log(res)
        return res;
    } catch (error) {
        console.log('error' , error) 
        return thunkAPI.rejectWithValue({status:error.status || 500 , message: error.data?.error || error.message})
    }
})

export const getTableThunk = createAsyncThunk('getTableThunk' , async (tableId , thunkAPI) =>{
    try {
       const res  = await tableService.getTable(tableId) 
        return res;
    } catch (error) {
        console.log(error) 
        return thunkAPI.rejectWithValue({status:error.status || 500 , message: error.data?.error || error.message})
    }
})