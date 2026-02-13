import { createSlice } from "@reduxjs/toolkit";

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
        
    },

})

export const {resetloadBillState} = loadBillSlice.actions;
export default loadBillSlice.reducer;