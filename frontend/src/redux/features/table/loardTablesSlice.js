import { createSlice } from "@reduxjs/toolkit";
import { addTableThunk , deleteTableThunk , updateTableThunk } from "../../thunks/tableThunk";

const initialState = {
    reqtype:null,
    loading: false,
    success: false,
    error: null,
}

const loardTablesSlice = createSlice({
  name: "loadTable",
  initialState,
  reducers: {
    resetLoadTablesState: (state) => {
      state.reqtype = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builter) =>{
    builter
    // add table
    .addCase(addTableThunk.pending , (state)=>{
      state.reqtype='addTable'
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(addTableThunk.fulfilled , (state)=>{
       state.reqtype='addTable'
      state.loading = false;
      state.error = null;
      state.success = true;
    })
    .addCase(addTableThunk.rejected , (state , action)=>{
       state.reqtype='addTable'
      state.loading = false;
      state.error = action.payload ;
    })
    // delete table
    .addCase(deleteTableThunk.pending , (state)=>{
      state.reqtype='deleteTable'
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(deleteTableThunk.fulfilled , (state)=>{
       state.reqtype='deleteTable'
      state.loading = false;
      state.error = null;
      state.success = true;
    })
  .addCase(deleteTableThunk.rejected , (state , action)=>{
      state.reqtype='deleteTable'
      state.loading = false;
      state.error = action.payload ;
    
  })

  //update tables
  .addCase(updateTableThunk.pending , (state)=>{
      state.reqtype='updateTable'
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(updateTableThunk.fulfilled , (state)=>{
       state.reqtype='updateTable'
      state.loading = false;
      state.error = null;
      state.success = true;
    })
  .addCase(updateTableThunk.rejected , (state , action)=>{
      state.reqtype='updateTable'
      state.loading = false;
      state.error = action.payload ;
  })

  }


  });

  export const { resetLoardTablesState } = loardTablesSlice.actions;
  export default loardTablesSlice.reducer;
  