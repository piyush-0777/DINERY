import { createSlice } from '@reduxjs/toolkit'
import { fetchOrdersThunk, updateOrderStatusThunk, getOrderThunk } from '../../thunks/ordersThunk'
import { loadDashbordThunk } from '../../thunks/loardDashbordThunk'



const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [] ,
    loading: false,
    reqtype: null,
    error: null,
    success: false,
  },

  reducers: {
    resetOrderLoadSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // for fatch order
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // for load dashbord
      .addCase(loadDashbordThunk.fulfilled, (state, action) => {
        state.list = action.payload.order.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

      })

      // for update status
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.reqtype = 'updateOrerStatus'
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        console.log(action.payload)
        state.list = state.list.map((e) => {
          if (e._id === action.payload.order._id) {
            return action.payload.order;
          } else {
            return e;
          }
        })
        state.loading = false
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getOrderThunk.fulfilled, (state, action) => {

        state.list = [action.payload.order , ...state.list]

      })
  },
})

export const { resetOrderLoadSlice } = ordersSlice.actions;
export default ordersSlice.reducer