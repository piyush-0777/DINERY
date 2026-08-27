import { configureStore } from "@reduxjs/toolkit";
import { foodReducer } from "../features/manu";
import { authReducer, otpReducer } from "../features/auth";
import { tableReducer } from "../features/table";
import { billReducer } from "../features/bill";
import { orderReducer } from "../features/order";
import { restaurantReducer } from "../features/loadside";
import { customerReducer } from "../features/customer";
import { analysisReducer } from "../features/analytics";
import { reportReducer } from "../features/reports";
import { socketReducer } from "../features/loadside";
import { premiumReducer } from "../features/premium";
import { adminReducer } from "../features/admin";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    foodObject: foodReducer,
    restaurant: restaurantReducer,
    auth: authReducer,
    tables: tableReducer,
    orders: orderReducer,
    bills: billReducer,
    analysis: analysisReducer,
    report: reportReducer,
    otp: otpReducer,
    socketId: socketReducer,
    premium: premiumReducer,
    admin: adminReducer,
  },
});