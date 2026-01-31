import { createSlice } from '@reduxjs/toolkit'
import { fetchOrdersThunk, updateOrderStatusThunk } from '../../thunks/ordersThunk'


const ordersSlice = createSlice({
name: 'orders',
initialState: {
list:  [
  {
    _id: "ORD-201",
    orderType: "TABLE",
    tableNo: 4,
    status: "Pending",
    totalAmount: 560,
    createdAt: Date.now() - 5 * 60 * 1000, // 5 mins ago
    items: [
      { name: "Gujarati Thali", qty: 1, price: 180 },
      { name: "Butter Roti", qty: 4, price: 40 },
      { name: "Dal Fry", qty: 1, price: 120 },
    ],
    isPaid: false,
  },

  {
    _id: "ORD-202",
    orderType: "ONLINE",
    customerName: "Rahul",
    status: "Preparing",
    totalAmount: 420,
    createdAt: Date.now() - 18 * 60 * 1000, // delayed order
    items: [
      { name: "Paneer Butter Masala", qty: 1, price: 220 },
      { name: "Butter Naan", qty: 3, price: 40 },
    ],
    isPaid: true,
  },

  {
    _id: "ORD-203",
    orderType: "TABLE",
    tableNo: 1,
    status: "Served",
    totalAmount: 850,
    createdAt: Date.now() - 25 * 60 * 1000,
    items: [
      { name: "Punjabi Thali", qty: 2, price: 250 },
      { name: "Sweet Lassi", qty: 2, price: 75 },
    ],
    isPaid: false,
  },

  {
    _id: "ORD-204",
    orderType: "ONLINE",
    customerName: "Swiggy",
    status: "Completed",
    totalAmount: 1200,
    createdAt: Date.now() - 45 * 60 * 1000,
    items: [
      { name: "Rajasthani Thali", qty: 2, price: 399 },
      { name: "Ghee Bajra Roti", qty: 4, price: 50 },
    ],
    isPaid: true,
  },

  {
    _id: "ORD-205",
    orderType: "TABLE",
    tableNo: 7,
    status: "Pending",
    totalAmount: 300,
    createdAt: Date.now() - 2 * 60 * 1000, // new order (pulse)
    items: [
      { name: "Masala Dosa", qty: 2, price: 150 },
    ],
    isPaid: false,
  },
],
loading: false,
error: null,
},
reducers: {},
extraReducers: (builder) => {
builder
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
},
})


export default ordersSlice.reducer