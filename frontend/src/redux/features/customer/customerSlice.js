import { createSlice, nanoid } from "@reduxjs/toolkit";
import { customerLoginThunk, LoadCustomerDashbord } from "../../thunks/customerThunk"

const initialState = {
    customer: {
        customerName: '',
        CustomerMobile: '',
        order: {
            items: [],
        },
    },
};


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


        },

        // add new order
        addOrder: (state, action) => {
            state.customer.order.items.push(action.payload);
        },

        incresContityOfOrder: (state, action) => {
            const index = state.customer.order.items.findIndex(
                item => item.food === action.payload
            );

            if (index !== -1) {
                state.customer.order.items[index].quantity += 1;
                state.customer.order.items[index].subtotal =
                    state.customer.order.items[index].quantity *
                    state.customer.order.items[index].price;
            }
        },

        dicresContityOfOrder: (state, action) => {
            const index = state.customer.order.items.findIndex(
                item => item.food === action.payload
            );

            if (index !== -1) {
                if (state.customer.order.items[index].quantity === 1) {
                    state.customer.order.items =
                        state.customer.order.items.filter(
                            item => item.food !== action.payload
                        );
                } else {
                    state.customer.order.items[index].quantity -= 1;
                    state.customer.order.items[index].subtotal =
                        state.customer.order.items[index].quantity *
                        state.customer.order.items[index].price;
                }
            }
        },

        deleteAllOrder: (state) => {
            state.customer.order.items = [];
        },
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
                state.customer.CustomerMobile = action.payload.data.phone
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
export const { addToken, 
    addCustomer, 
    addOrder,
  incresContityOfOrder,
  dicresContityOfOrder,
  deleteAllOrder, } = customerSlice.actions

export default customerSlice.reducer;