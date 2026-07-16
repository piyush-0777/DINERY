// tablesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { TABLE_STATUS } from "../../../components/owner/table/TableStatus";
import { addTableThunk, deleteTableThunk, updateTableThunk, getTableThunk , updateStatusThunk } from "../../thunks/tableThunk";
import { loadDashbordThunk } from '../../thunks/loardDashbordThunk'
import { cashPaymentThunk } from '../../thunks/billThunk'
import { updateOrderStatusThunk } from "../../thunks/ordersThunk";


const initialState = {
    tables: [],
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
        // load dashbord
            .addCase(loadDashbordThunk.fulfilled, (state, action) => {
                state.tables = action.payload.tables;

            })
            // add new table
            .addCase(addTableThunk.fulfilled, (state, action) => {
                state.tables.push(action.payload.table)
            })
                // updata order thank chang table ouder staus
                .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
                
                        state.tables = state.tables.map((e) => {
                          if (e?.order?._id == action.payload.order._id) {
                            e.order = action.payload.order
                            return e;
                          } else {
                            return e;
                          }
                        })
                        state.loading = false
                      })


            //delete table
            .addCase(deleteTableThunk.fulfilled, (state, action) => {
                state.tables = state.tables.filter((table) => table._id !== action.payload.table._id)
            })
           // update table
            .addCase(updateTableThunk.fulfilled, (state, action) => {
                state.tables = state.tables.map((table) => {
                    if (table._id === action.payload.table._id) {
                        return action.payload.table;
                    } else {
                        return table;
                    }
                })
            })

            //cash paymant
            .addCase(cashPaymentThunk.fulfilled, (state, action) => {
                state.tables = state.tables.map((e) => {
                    if (e._id === action.payload.data.table._id) return action.payload.data.table;
                    else return e;
                })
            })

            //get table
            .addCase(getTableThunk.fulfilled, (state, action) => {
                state.tables = state.tables.map((table) => {
                    if (table._id === action.payload.table._id) {
                        return action.payload.table;
                    } else {
                        return table;
                    }
                })
            })

            //update table status

            .addCase(updateStatusThunk.fulfilled, (state, action) =>{
                state.tables = state.tables.map((table) => {
                    if (table._id === action.payload.table._id) {
                        return action.payload.table;
                    } else {
                        return table;
                    }
                })
            })
    }
});

export const { updateTableStatus, mergeTables } = tablesSlice.actions;
export default tablesSlice.reducer;
