import { createSlice, nanoid } from "@reduxjs/toolkit";
import { customerLoginThunk , LoadCustomerDashbord } from "../../thunks/customerThunk"

const initialState = {
    customer: { 
        resturantId:null , 
        _id:null , 
        createdAt:null, 
        customerName: '', 
        CustomerMobile: '', 
        order: [], 
        token: null 
    },
    reqtype: null ,
    loading: false,
    message: null,
    success: false,
    error: null,
}

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.customer.token = action.payload
        },
        // use to add customer
        addCustomer: (state, action) => {
            state.customer.customerName = action.payload.customerName;
            state.customer.CustomerMobile = action.payload.CustomerMobile
            console.log("addCustomer");

        },

        // add new order
        addOrder: (state, action) => {
            state.customer.order.push(action.payload);
        },

        //delet one order
        deletOrder: (state, action) => {
            const neworder = state.customer.order.filter(order => order.f_name !== action.payload.f_name);
            state.customer.order = neworder;
        },

        //incress contity of order
        incresContityOfOrder: (state, action) => {

            const index = state.customer.order.findIndex((e) => action.payload.name == e.name)
            if (index !== -1) {
                state.customer.order[index].number_of_item = state.customer.order[index].number_of_item + 1;
            } else {
                console.log(index, 'this index is not found in stroge');
            }
        },

        //dicress contity of order
        dicresContityOfOrder: (state, action) => {
            const index = state.customer.order.findIndex((e) => action.payload.f_name == e.f_name)
            if (index !== -1) {
                if (state.customer.order[index].number_of_item === 1) {
                    const neworder = state.customer.order.filter(order => order.f_name !== action.payload.f_name);
                    state.customer.order = neworder;
                } else {
                    state.customer.order[index].number_of_item = state.customer.order[index].number_of_item - 1;
                }

            } else {
                console.log(index, 'this index is not found in stroge ');
            }
        },

        // delete all order
        deleteAllOrder: (state, action) => {
            state.customer.order = [];
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(customerLoginThunk.pending, (state) => {
                state.reqtype = 'login'
                state.loading = true;
                state.error = null;
            })
            .addCase(customerLoginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.customer.resturantId = action.payload.data.restaurant;
                state.customer._id = action.payload.data._id
                state.customer.customerName = action.payload.data.name
                state.customer.CustomerMobile =action.payload.data.phone
                state.customer.createdAt = action.payload.data.createdAt
                state.success = true;
            })
            .addCase(customerLoginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? {
                    status: 500,
                    message: action.error.message,
                };
            })
            .addCase(LoadCustomerDashbord.pending, (state) => {
                state.reqtype = 'dashbord'
                state.loading = true;
                state.error = null;
            })
            .addCase(LoadCustomerDashbord.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(LoadCustomerDashbord.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? {
                    status: 500,
                    message: action.error.message,
                };
            })
    }
})
export const { addToken, addCustomer, addOrder, deleteAllOrder, incresContityOfOrder, dicresContityOfOrder, deletOrder } = customerSlice.actions

export default customerSlice.reducer;