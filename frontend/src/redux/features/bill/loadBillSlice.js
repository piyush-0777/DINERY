import { createSlice } from "@reduxjs/toolkit";
import {cashPaymentThunk} from '../../thunks/billThunk'

const initialState = {
    reqtype:null,
    loading: false,
    success: false,
    error: null,
}

const loadBillSlice = createSlice({
  name: "loadFood",
  initialState,
  reducers: {
    resetloadBillState: (state) => {
      state.reqtype = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(cashPaymentThunk.pending , (state) => {
        state.reqtype = 'cashPayment'
        state.loading = true;
      })
      .addCase(cashPaymentThunk.fulfilled , (state)=>{
        state.loading = false;
        state.success = true;
      })
      .addCase(cashPaymentThunk.rejected , (state , action) =>{
        state.loading = false;
        state.error = action.payload;
      })
        
    },

})

export const {resetloadBillState} = loadBillSlice.actions;
export default loadBillSlice.reducer;