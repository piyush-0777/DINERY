import { createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    customer:{customerName:'piyush' , CustomerMobile:'9327161899' , order:[]}
}

export const customerSlice = createSlice({
    name: 'customer' , 
    initialState,
    reducers: {
        addCustomer: (state , action) => {
            console.log("addCustomer");

        },
        addOrder: (state , action) => {
            state.customer.order.push(action.payload);
        } ,
        incresContityOfOrder: (state , action) => {
            
           const index = state.customer.order.findIndex((e)=>action.payload.f_name==e.f_name)
           if(index !== -1){
           state.customer.order[index].number_of_item = state.customer.order[index].number_of_item +1;
           } else {
            console.log(index);
           }
        },
        deleteAllOrder: (state , action) => {
            state.customer.order = [];
        }
    }
})
export const {addCustomer , addOrder, deleteAllOrder , incresContityOfOrder } =customerSlice.actions

export default customerSlice.reducer;