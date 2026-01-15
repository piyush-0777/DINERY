import { createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    customer:{customerName:'' , CustomerMobile:'' , order:[]}
}

export const customerSlice = createSlice({
    name: 'customer' , 
    initialState,
    reducers: {
        addCustomer: (state , action) => {
            state.customer.customerName = action.payload.customerName;
            state.customer.CustomerMobile = action.payload.CustomerMobile
            console.log("addCustomer");

        },
        addOrder: (state , action) => {
            state.customer.order.push(action.payload);
        } ,
        deletOrder: (state , action) => {
             const neworder = state.customer.order.filter(order => order.f_name !== action.payload.f_name);
             state.customer.order = neworder;
        },

        incresContityOfOrder: (state , action) => {
            
           const index = state.customer.order.findIndex((e)=>action.payload.f_name==e.f_name)
           if(index !== -1){
           state.customer.order[index].number_of_item = state.customer.order[index].number_of_item +1;
           } else {
            console.log(index , 'this index is not found in stroge');
           }
        },
        dicresContityOfOrder: (state , action) => {
            const index = state.customer.order.findIndex((e)=>action.payload.f_name==e.f_name)
           if(index !== -1){
                if(state.customer.order[index].number_of_item === 1) {
                    const neworder = state.customer.order.filter(order => order.f_name !== action.payload.f_name);
                     state.customer.order = neworder;
                }else {
                     state.customer.order[index].number_of_item = state.customer.order[index].number_of_item - 1;
                }
           
           } else {
            console.log(index , 'this index is not found in stroge ');
           }
        },
        deleteAllOrder: (state , action) => {
            state.customer.order = [];
        }
    }
})
export const {addCustomer , addOrder, deleteAllOrder , incresContityOfOrder , dicresContityOfOrder , deletOrder } =customerSlice.actions

export default customerSlice.reducer;