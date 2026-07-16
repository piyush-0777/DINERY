import { createAsyncThunk } from '@reduxjs/toolkit'
 import {billService} from '../../services/billService'

export const getBillThunk = createAsyncThunk('getBillThunk' , async (id ,thunkAPI )=>{
    try {
           const res = await billService.getBillsForOwner(id);
           console.log(res);
            return res;
    } catch (error) {
         console.log(error)
            return thunkAPI.rejectWithValue({ status: error.status || 500, message: error.data?.error || error.message });
    }
})

export const cashPaymentThunk = createAsyncThunk('cashPaymentThunk' , async ({billId , tableId , customerId} ,thunkAPI ) =>{
 try {
           const res = await billService.cashPaymentBill(billId , tableId , customerId);
            return res;
    } catch (error) {
         console.log(error)
            return thunkAPI.rejectWithValue({ status: error.status || 500, message: error.data?.error || error.message });
    }
} )