import { createSlice  } from "@reduxjs/toolkit";

import {loadDashbordThunk} from '../../thunks/loardDashbordThunk'


const initialState = {
    restaurant: null,
   
}

export const restaurantSlice = createSlice({
    name:'restaurnat',
    initialState,
    reducers: {
        logout: (state , action) =>{
            state.restaurant = null;
        }
    },
     extraReducers:(builder) => {
            builder
              
              .addCase(loadDashbordThunk.fulfilled, (state , action) => {
               state.restaurant = action.payload.restaurant
              })
             
          },
    
})

export default restaurantSlice.reducer