import { createSlice, nanoid } from "@reduxjs/toolkit";
import { customerLoginThunk, LoadCustomerDashbord , CustomerPlaceOrder } from "./customerThunk"

const initialState = {
    token: null ,
    customer: null,
    order: {
        items: [],
    },
    placedOrder:{
        order:null,
        bill:null
    }
};


export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload
        },
        // use to add customer
        addCustomer: (state, action) => {
            state.customer.customerName = action.payload.customerName;
            state.customer.CustomerMobile = action.payload.CustomerMobile
        },

        // add new order
        addOrder: (state, action) => {
            state.order.items.push(action.payload);
        },

        incresContityOfOrder: (state, action) => {
            const index = state.order.items.findIndex(
                item => item.food === action.payload
            );

            if (index !== -1) {
                state.order.items[index].quantity += 1;
                state.order.items[index].subtotal =
                    state.order.items[index].quantity *
                    state.order.items[index].price;
            }
        },

        dicresContityOfOrder: (state, action) => {
            const index = state.order.items.findIndex(
                item => item.food === action.payload
            );

            if (index !== -1) {
                if (state.order.items[index].quantity === 1) {
                    state.order.items =
                        state.order.items.filter(
                            item => item.food !== action.payload
                        );
                } else {
                    state.order.items[index].quantity -= 1;
                    state.order.items[index].subtotal =
                        state.order.items[index].quantity *
                        state.order.items[index].price;
                }
            }
        },

        deletOrder: (state, action) => {
            state.order.items =
                state.order.items.filter(
                    item => item.food !== action.payload
                );
        },

        deleteAllOrder: (state) => {
            state.order.items = [];
        },
        updateOrderStatus: (state , action) =>{
           // status , orderId
           if(state.placedOrder?.order?._id ==action.payload.orderId){
            state.placedOrder.order.status = action.payload.status;
           }
        } ,
        updateBillStatus: (state , action) =>{
           // status , billId
           if(state.placedOrder?.bill?._id ==action.payload.billId){
            state.placedOrder.bill.paymentStatus = action.payload.status;
           }
        }
    },

    extraReducers: (builder) => {
        builder
            
            .addCase(customerLoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                // state.message = action.payload.message;
                // state.customer.resturantId = action.payload.data.restaurant;
                // state.customer._id = action.payload.data._id
                // state.customer.customerName = action.payload.data.name
                // state.customer.CustomerMobile = action.payload.data.phone
                // state.customer.createdAt = action.payload.data.createdAt
                state.customer = action.payload.data
                state.success = true;
            })
           .addCase(CustomerPlaceOrder.fulfilled, (state , action)=>{
            state.placedOrder = action.payload.data;
           })
           .addCase(LoadCustomerDashbord.fulfilled, (state , action)=>{
            console.log(action.payload.customer)
            
            if(action.payload.tableStatus == 'active'){
                state.customer = action.payload.customer;
            }
            if(action.payload.tableStatus == 'occupied') {
                 state.customer = action.payload.customer;
                 state.placedOrder.order = action.payload.order;
                 state.placedOrder.bill = action.payload.bill;
            }
           })

           
    }
})
export const { addToken,
    addCustomer,
    addOrder,
    incresContityOfOrder,
    dicresContityOfOrder,
    deleteAllOrder, 
    deletOrder ,
updateOrderStatus ,
updateBillStatus ,
 } = customerSlice.actions

export default customerSlice.reducer;