import { createAsyncThunk } from '@reduxjs/toolkit'
import {orderService} from '../../services/orderService'



export const fetchOrdersThunk = createAsyncThunk(
    'orders/fetch',
    async (_, { rejectWithValue }) => {
        try {

        } catch (err) {

        }
    }
)


export const updateOrderStatusThunk = createAsyncThunk(
    'orders/updateStatus',
    async ({ id, status }, thunkAPI) => {
        try {
            const res = await orderService.updateOrderStatus(id, status);
            return res;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue({ status: error.status || 500, message: error.data?.error || error.message });
        }
    }
)

export const getOrderThunk = createAsyncThunk('getOrderThunk' , async (id ,thunkAPI )=>{
    try {
            res = await orderService.getOrdersForOwner(id);
            return res;
    } catch (error) {
         console.log(error)
            return thunkAPI.rejectWithValue({ status: error.status || 500, message: error.data?.error || error.message });
    }
})