// tablesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { TABLE_STATUS } from "../../../components/owner/table/TableStatus";
import { addTableThunk , deleteTableThunk , updateTableThunk } from "../../thunks/tableThunk";
import { loadDashbordThunk } from '../../thunks/loardDashbordThunk'


const initialState = {
    tables:[],
};

const tablesSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        updateTableStatus(state, action) {
            const table = state.tables.find(t => t.id === action.payload.id);
            if (table) table.status = action.payload.status;
        },
        mergeTables(state, action) {
            const { sourceIds, targetId } = action.payload;

            const target = state.tables.find(t => t.id === targetId);

            sourceIds.forEach(id => {
                const t = state.tables.find(tb => tb.id === id);
                if (t && t.items) {
                    target.items = [...(target.items || []), ...t.items];
                    t.status = "available";
                    t.items = [];
                }
            });
        }
    },
    extraReducers: (builter) => {
    builter
    .addCase(loadDashbordThunk.fulfilled, (state, action) => {
            state.tables = action.payload.tables;
            
          })
    .addCase(addTableThunk.fulfilled , (state, action)=>{
       state.tables.push(action.payload.table)
    })
    .addCase(deleteTableThunk.fulfilled , (state, action)=>{
       state.tables =state.tables.filter((table)=> table._id !== action.payload.table._id)
    })
     .addCase(updateTableThunk.fulfilled , (state, action)=>{
       state.tables =state.tables.map((table)=>{ 
        if(table._id === action.payload.table._id){
                return action.payload.table;
        } else {
            return table;
        }
    })
    })
    }
});

export const { updateTableStatus , mergeTables } = tablesSlice.actions;
export default tablesSlice.reducer;
