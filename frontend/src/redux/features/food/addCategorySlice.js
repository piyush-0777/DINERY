import { createSlice } from "@reduxjs/toolkit";
import { addCategoryThunk , deletCategoryThunk , editCategoryThunk } from '../../thunks/manuThunk'


const initialState = {
    reqtyp:null,
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
        
    },
    extraReducers: (builder) => {
            builder
                .addCase(addCategoryThunk.pending, (state) => {
                    state.reqtyp = 'add'
                    state.loading = true;
                    state.error = null;
                    
                })
                .addCase(addCategoryThunk.fulfilled, (state) => {
                    state.loading = false;
                    state.success = true;
                })
                .addCase(addCategoryThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                .addCase(deletCategoryThunk.pending, (state) => {
                    state.reqtyp='delete'
                    state.loading = true;
                    state.error = null;
                    
                })
                .addCase(deletCategoryThunk.fulfilled, (state , action) => {
                    state.loading = false;
                    state.success = true;
                })
                .addCase(deletCategoryThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                    .addCase(editCategoryThunk.pending, (state) => {
                    state.reqtyp='edit'
                    state.loading = true;
                    state.error = null;
                    
                })
                .addCase(editCategoryThunk.fulfilled, (state , action) => {
                    state.loading = false;
                    state.success = true;
                })
                .addCase(editCategoryThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        }
})

export const { resetAddCategoryState } = addCategorySlice.actions;
export default addCategorySlice.reducer;