import { createSlice , nanoid } from "@reduxjs/toolkit";

const initialState = {
    customer:{customerName:'' , CustomerMobile:'' , order:[]}
}

export const customerSlice = createSlice({
    name: 'customer' , 
    initialState,
    reducers: {
        // use to add customer
        addCustomer: (state , action) => {
            state.customer.customerName = action.payload.customerName;
            state.customer.CustomerMobile = action.payload.CustomerMobile
            console.log("addCustomer");

        },

        // add new order
        addOrder: (state , action) => {
            state.customer.order.push(action.payload);
        } ,

        //delet one order
        deletOrder: (state , action) => {
             const neworder = state.customer.order.filter(order => order.f_name !== action.payload.f_name);
             state.customer.order = neworder;
        },

        //incress contity of order
        incresContityOfOrder: (state , action) => {
            
           const index = state.customer.order.findIndex((e)=>action.payload.f_name==e.f_name)
           if(index !== -1){
           state.customer.order[index].number_of_item = state.customer.order[index].number_of_item +1;
           } else {
            console.log(index , 'this index is not found in stroge');
           }
        },

        //dicress contity of order
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

        // delete all order
        deleteAllOrder: (state , action) => {
            state.customer.order = [];
        }
    }
})
export const {addCustomer , addOrder, deleteAllOrder , incresContityOfOrder , dicresContityOfOrder , deletOrder } =customerSlice.actions

export default customerSlice.reducer;