import {createAsyncThunk} from '@reduxjs/toolkit'
import {customerService} from '../../services/customerService'


export const customerLoginThunk = createAsyncThunk('customerLoginThunk' , async ({resturantName ,customerName ,CustomerMobile} , thunkAPI)=>{
try {
const data = {name:customerName ,phone:CustomerMobile}
    const res = await customerService.customerLogin(resturantName , data)
    return res;
} catch (error){
     console.log(error)
    return thunkAPI.rejectWithValue({status:error.status || 500 , message:error.data?.error || error.message});
}
})