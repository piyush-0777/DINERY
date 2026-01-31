import { createAsyncThunk } from '@reduxjs/toolkit'



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
async ({ id, status }, { rejectWithValue }) => {
try {

} catch (err) {

}
}
)