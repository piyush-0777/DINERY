import { createSlice } from "@reduxjs/toolkit";
import { addCategoryThunk } from '../../thunks/manuThunk'


const initialState = {
    loading: false,
    success: false,
    error: null,
}

const addCategorySlice = createSlice({
    name: 'addcategory',
    initialState,
    reducers: {
        resetAddCategoryState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
        },
        extraReducers: (builder) => {
            builder
                .addCase(addCategoryThunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    state.success = false;
                })
                .addCase(addCategoryThunk.fulfilled, (state) => {
                    state.loading = false;
                    state.success = true;
                })
                .addCase(addCategoryThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        }
    },
})

export const { resetAddCategoryState } = addCategorySlice.actions;
export default addCategorySlice.reducer;