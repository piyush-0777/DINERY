import { createSlice  } from "@reduxjs/toolkit";

const initialState = {
    socketId: null
}

export const socketSlice = createSlice({
    name:'restaurnat',
    initialState,
    reducers: {
        addSocketId: (state , action) =>{
            console.log('slice' , action.payload)
            state.socketId = action.payload;
        }
    },
});

export const { addSocketId } = socketSlice.actions;
export default socketSlice.reducer