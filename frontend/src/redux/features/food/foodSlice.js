import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {loadDashbordThunk} from '../../thunks/loardDashbordThunk'
import {addFoodThunk , deletFoodThunk} from '../../thunks/manuThunk'



const initialState = {
   foods:[] ,
    category:[]
}

export const foodSlice = createSlice({
    name:'food',
    initialState,
    reducers:{

    },
    extraReducers:(builder) => {
        builder
          
          .addCase(loadDashbordThunk.fulfilled, (state , action) => {
            state.foods = action.payload.foods;
            state.category = action.payload.category;
          })
          .addCase(addFoodThunk.fulfilled, (state , action) => {
            state.foods.push(action.payload.food)
          })
          .addCase(deletFoodThunk.fulfilled, (state , action) => {
            state.foods.filter(item=> item._id !== action.payload);
          })
         
      },
})

export default foodSlice.reducer;