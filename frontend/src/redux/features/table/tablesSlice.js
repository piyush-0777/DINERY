// tablesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { TABLE_STATUS } from "../../../components/owner/table/TableStatus";

const initialState = {
    tables: [
        {
            id: "t1",
            number: 1,
            capacity: 4,
            status: TABLE_STATUS.AVAILABLE,
        },
        {
            id: "t2",
            number: 2,
            capacity: 2,
            status: TABLE_STATUS.ORDERED,
            total: 840,
            time: "12 min",
        },
        {
            id: "t3",
            number: 3,
            capacity: 6,
            status: TABLE_STATUS.BILL_PENDING,
            total: 1620,
            time: "25 min",
        },
    ],
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
});

export const { updateTableStatus , mergeTables } = tablesSlice.actions;
export default tablesSlice.reducer;
