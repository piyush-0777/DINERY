import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";


import CustomerHome from "../pages/customer/CustomerHome";
import CustomerBill from "../pages/customer/CustomerBill"
// import MenuPage from "../pages/customer/MenuPage";
// import CartPage from "../pages/customer/CartPage";
// import OrderHistory from "../pages/customer/OrderHistory";

const CustomerRoutes = () => {

  return (
    <CustomerLayout>
      <Routes>
        <Route path="CustomerHome" element={<CustomerHome />} />
        <Route path="CustomerBill" element={<CustomerBill />} />
        
      </Routes>
    </CustomerLayout>
  );
};

export default CustomerRoutes;
