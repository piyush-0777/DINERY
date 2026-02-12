import { createSlice } from '@reduxjs/toolkit'
import { loadDashbordThunk } from '../../thunks/loardDashbordThunk'


const ordersSlice = createSlice({
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
    }
})