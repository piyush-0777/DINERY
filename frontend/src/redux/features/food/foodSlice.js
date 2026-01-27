import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {loadDashbordThunk} from '../../thunks/loardDashbordThunk'
import {addFoodThunk , deletFoodThunk , updateFoodThunk , addCategoryThunk , deletCategoryThunk} from '../../thunks/manuThunk'



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
            console.log('filter is run' ,action.payload )
            state.foods = state.foods.filter(item=> item._id !== action.payload);
            console.log(state.foods)
          })

          .addCase(addCategoryThunk.fulfilled, (state , action) => {
            state.category.push(action.payload.category)
          })
          .addCase(deletCategoryThunk.fulfilled, (state , action) => {
            console.log('filter is run cate' ,action.payload )
            state.foods  = state.foods.filter (item => item.category !==action.payload);
            state.category = state.category.filter(item=> item._id !== action.payload);
            console.log(state.foods)
          })
         
      },
})

export default foodSlice.reducer;