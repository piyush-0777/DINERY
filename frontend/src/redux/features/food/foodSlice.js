import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loadDashbordThunk } from '../../thunks/loardDashbordThunk'
import {
  addFoodThunk,
  deletFoodThunk,
  updateFoodThunk,
  addCategoryThunk,
  deletCategoryThunk,
  editCategoryThunk,
  changeAvailablity
} from '../../thunks/manuThunk'



const initialState = {
  foods: [],
  category: []
}

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(loadDashbordThunk.fulfilled, (state, action) => {
        state.foods = action.payload.foods;
        state.category = action.payload.category;
      })
      .addCase(addFoodThunk.fulfilled, (state, action) => {
        state.foods.push(action.payload.food)
      })
      .addCase(deletFoodThunk.fulfilled, (state, action) => {

        state.foods = state.foods.filter(item => item._id !== action.payload);
      })
      .addCase(updateFoodThunk.fulfilled, (state, action) => {

        state.foods = state.foods.map(item =>
          item._id === action.payload.data._id
            ? action.payload.data
            : item
        );
      })

      .addCase(addCategoryThunk.fulfilled, (state, action) => {
        state.category.push(action.payload.category)
      })
      .addCase(deletCategoryThunk.fulfilled, (state, action) => {

        state.foods = state.foods.filter(item => item.category !== action.payload);
        state.category = state.category.filter(item => item._id !== action.payload);

      })
      .addCase(editCategoryThunk.fulfilled, (state, action) => {

        state.category = state.category.map(item =>
          item._id === action.payload.data._id
            ? action.payload.data
            : item
        )
      })
      .addCase(changeAvailablity.fulfilled, (state, action) => {
        state.foods = state.foods.map(item =>
          item._id === action.payload.data._id
            ? action.payload.data
            : item
        );
      })


  },
})

export default foodSlice.reducer;