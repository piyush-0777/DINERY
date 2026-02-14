import { createAsyncThunk } from '@reduxjs/toolkit'
 import {billService} from '../../services/billService'

export const getBillThunk = createAsyncThunk('getBillThunk' , async (id ,thunkAPI )=>{
    try {
           const res = await billService.getBillsForOwner(id);
            return res;
    } catch (error) {
         console.log(error)
            return thunkAPI.rejectWithValue({ status: error.status || 500, message: error.data?.error || error.message });
    }
})

export const cashPaymentThunk = createAsyncThunk('cashPaymentThunk' , async ({billId , orderId} ,thunkAPI ) =>{
 try {
           const res = await billSecrvice.cashPaymentBill(billId , orderId);
            return res;
    } catch (error) {
         console.log(error)
            return thunkAPI.rejectWithValue({ status: error.status || 500, message: error.data?.error || error.message });
    }
} )