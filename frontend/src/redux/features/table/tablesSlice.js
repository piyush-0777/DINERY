import { createSlice } from "@reduxjs/toolkit";

/**
 * Dummy data for preview (remove later when API is connected)
 */
const initialTables = [
    { id: 1, number: 1, status: "available" },
    { id: 2, number: 2, status: "occupied" },
    { id: 3, number: 3, status: "reserved" },
    { id: 4, number: 4, status: "available" },
    { id: 5, number: 5, status: "occupied" },
    { id: 6, number: 6, status: "reserved" },
];

const initialState = {
    tables: initialTables,
    loading: false,
    error: null,
};

const tablesSlice = createSlice({
    name: "tables",
    initialState,
    reducers: {
        assignOrderToTable: (state, action) => {
            const table = state.tables.find(t => t.id === action.payload);
            if (table) table.status = "occupied";
        },

        clearTable: (state, action) => {
            const table = state.tables.find(t => t.id === action.payload);
            if (table) table.status = "available";
        },

        reserveTable: (state, action) => {
            const table = state.tables.find(t => t.id === action.payload);
            if (table) table.status = "reserved";
        },
        addTable: (state) => {
            const nextNumber = state.tables.length + 1;

            state.tables.push({
                id: Date.now(),
                number: nextNumber,
                status: "available",
            });
        },

        deleteTable: (state, action) => {
            state.tables = state.tables.filter(
                (table) => table.id !== action.payload
            );
        },
    },
});

export const {
    assignOrderToTable,
    clearTable,
    reserveTable,
    addTable,
  deleteTable,
} = tablesSlice.actions;

export default tablesSlice.reducer;
