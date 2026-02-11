import { createSlice } from '@reduxjs/toolkit'
import { fetchOrdersThunk, updateOrderStatusThunk } from '../../thunks/ordersThunk'
import { loadDashbordThunk } from '../../thunks/loardDashbordThunk'



const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [

      {
        _id: '120',
        restaurant: "65f1a1a1a1a1a1a1a1a1a1a1",
        table: "65f2b2b2b2b2b2b2b2b2b2b2",
        status: "Pending",
        totalAmount: 560,
        createdAt: Date.now() - 25 * 60 * 1000,
        items: [
          {
            name: "Gujarati Thali",
            price: 180,
            quantity: 1,
            subtotal: 180,
          },
          {
            name: "Butter Roti",
            price: 40,
            quantity: 4,
            subtotal: 160,
          },
          {
            name: "Dal Fry",
            price: 120,
            quantity: 1,
            subtotal: 120,
          },
        ],
      },

      {
        _id: '121',
        restaurant: "65f1a1a1a1a1a1a1a1a1a1a1",
        customer: "65f3c3c3c3c3c3c3c3c3c3c3",
        status: "Preparing",
        totalAmount: 420,
        createdAt: Date.now() - 25 * 60 * 1000,
        items: [
          {
            name: "Paneer Butter Masala",
            price: 220,
            quantity: 1,
            subtotal: 220,
          },
          {
            name: "Butter Naan",
            price: 40,
            quantity: 3,
            subtotal: 120,
          },
        ],
      },

      {
        _id: '122',
        restaurant: "65f1a1a1a1a1a1a1a1a1a1a1",
        table: "65f2d4d4d4d4d4d4d4d4d4d4",
        status: "Completed",
        totalAmount: 850,
        createdAt: Date.now() - 25 * 60 * 1000,
        items: [
          {
            name: "Punjabi Thali",
            price: 250,
            quantity: 2,
            subtotal: 500,
          },
          {
            name: "Sweet Lassi",
            price: 75,
            quantity: 2,
            subtotal: 150,
          },
        ],
      },

      {
        _id: '124',
        restaurant: "65f1a1a1a1a1a1a1a1a1a1a1",
        customer: "65f3e5e5e5e5e5e5e5e5e5e5",
        status: "Completed",
        totalAmount: 1200,
        createdAt: Date.now() - 45 * 60 * 1000,
        items: [
          {
            name: "Rajasthani Thali",
            price: 399,
            quantity: 2,
            subtotal: 798,
          },
          {
            name: "Ghee Bajra Roti",
            price: 50,
            quantity: 4,
            subtotal: 200,
          },
        ],
      },

      {
        _id: '125',
        restaurant: "65f1a1a1a1a1a1a1a1a1a1a1",
        table: "65f2f6f6f6f6f6f6f6f6f6f6",
        status: "Pending",
        totalAmount: 300,
        createdAt: Date.now() - 2 * 60 * 1000,
        items: [
          {
            name: "Masala Dosa",
            price: 150,
            quantity: 2,
            subtotal: 300,
          },
        ],
      },
    ],
    loading: false,
    reqtype:null , 
    error: null,
    success: false,
  },

   reducers: {
    resetOrderLoadSlice: (state)=>{
      state.loading = false;
      state.error = null;
      state.success = false;
    } ,
  } ,
  extraReducers: (builder) => {
    builder
      // for fatch order
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // for load dashbord
      .addCase(loadDashbordThunk.fulfilled, (state, action) => {
        state.list = action.payload.order;

      })

      // for update status
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.reqtype='updateOrerStatus'
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false
        state.list = state.list.map((e)=>{
            if(e._id === action.payload.order._id) {
              return action.payload.order;
            } else {
              return e;
            }
        })
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const {resetOrderLoadSlice} = ordersSlice.actions;
export default ordersSlice.reducer