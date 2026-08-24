export { default as BillSummary } from "./components/BillSummary";
export { default as Button } from "./components/Button";
export { default as CartBar } from "./components/CartBar";
export { default as ManuCategory } from "./components/ManuCategory";
export { default as ManuItem } from "./components/ManuItem";
export { default as OrderItems } from "./components/OrderItems";
export { default as OrderTimeline } from "./components/OrderTimeline";
export { default as PayNowCard } from "./components/PayNowCard";
export { default as StatusBadge } from "./components/StatusBadge";

export { useCustomerLogin } from "./hooks/useCustomerLogin";
export { useLoadCustomerDashbord } from "./hooks/useLoadCustomerDashbord";
export { useCustomerPlaceOrder } from "./hooks/useCustomerPlaceOrder";

export { default as customerReducer } from "./slice/customerSlice";

export { LoadCustomerDashbord , customerLoginThunk , CustomerPlaceOrder } from "./slice/customerThunk";

export {
  addToken,
  addCustomer ,
  addOrder,
  deletOrder,
  incresContityOfOrder,
  dicresContityOfOrder ,
  deleteAllOrder,
  updateOrderStatus,
  updateBillStatus,
} from "./slice/customerSlice";
