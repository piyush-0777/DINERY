import { createSlice } from "@reduxjs/toolkit";
import {
    customerLoginThunk,
    LoadCustomerDashbord,
    CustomerPlaceOrder

}
    from '../../thunks/customerThunk'

const initialState = {
    reqtype: null,
    loading: false,
    success: false,
    error: null,
}

const loadCustomerSlice = createSlice({
    name: "loadCustomer",
    initialState,
    reducers: {
        resetloadCustomerState: (state) => {
            state.reqtype = null;
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(customerLoginThunk.pending, (state) => {
                state.reqtype = 'loginCustomer';
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(customerLoginThunk.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(customerLoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

             .addCase(LoadCustomerDashbord.pending, (state) => {
                state.reqtype = 'loadDashbord';
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(LoadCustomerDashbord.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(LoadCustomerDashbord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

             .addCase(CustomerPlaceOrder.pending, (state) => {
                state.reqtype = 'placeOrder';
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(CustomerPlaceOrder.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(CustomerPlaceOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { resetloadCustomerState } = loadCustomerSlice.actions;
export default loadCustomerSlice.reducer;