import {createAsyncThunk} from '@reduxjs/toolkit'
import {customerService} from '../../services/customerService'



export const customerLoginThunk = createAsyncThunk('customerLoginThunk' , async ({resturantName ,customerName ,CustomerMobile , token} , thunkAPI)=>{
try {
    
const data = {name:customerName ,phone:CustomerMobile , token:token}
    const res = await customerService.customerLogin(resturantName , data)
    return res;
} catch (error){
    console.log(error.data);
    return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.message || error.message});
}
})

export const LoadCustomerDashbord = createAsyncThunk('LoadCustomerDashbord' , async ({restaurantName , token} , thunkAPI) =>{
    try {
        const res = await customerService.getCustomerDashbord(restaurantName , token);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.message || error.message})
    }
})


export const CustomerPlaceOrder = createAsyncThunk('CustomerPlaceOrder' , async ({restaurantName , data} , thunkAPI)=>{
    try {
        const res = await customerService.placeCustomerOrder(restaurantName , data)
        return res;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message})
    }
})