import { createSlice } from '@reduxjs/toolkit'
import { loadDashbordThunk } from '../../thunks/loardDashbordThunk'
import {getBillThunk} from '../../thunks/billThunk'


const billSlice = createSlice({
    name: 'bill',
    initialState: {
        bill: []
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadDashbordThunk.fulfilled, (state, action) => {
                state.bill = action.payload.bill.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
            })
            .addCase(getBillThunk.fulfilled, (state , action) => {
                state.bill =[action.payload.bill , ...state.bill ]
            })
    }
})

export default billSlice.reducer;