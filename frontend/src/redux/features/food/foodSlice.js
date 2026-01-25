import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {loadDashbordThunk} from '../../thunks/loardDashbordThunk'
import {addFoodThunk} from '../../thunks/manuThunk'

const fetchFoods = async () =>{
  
}


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
         
      },
})

export default foodSlice.reducer;