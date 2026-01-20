import { Routes, Route } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";

import CustomerHome from "../pages/customer/CustomerHome";
import MenuPage from "../pages/customer/MenuPage";
import CartPage from "../pages/customer/CartPage";
import OrderHistory from "../pages/customer/OrderHistory";

const CustomerRoutes = () => {
  return (
    <CustomerLayout>
      <Routes>
        <Route path="home" element={<CustomerHome />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="orders" element={<OrderHistory />} />
      </Routes>
    </CustomerLayout>
  );
};

export default CustomerRoutes;
