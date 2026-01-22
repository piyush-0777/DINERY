import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import {registerRestaurnatThunk} from "../../thunks/authThunk"


const initialState = {
    restaurant: null,
    loading: false,
    error: null,
}

export const restaurantSlice = createSlice({
    name:'restaurnat',
    initialState,
    reducers: {
        logout: (state , action) =>{
            state.restaurant = null;
            state.token = null;
        }
    },
    
})

export default restaurantSlice.reducer