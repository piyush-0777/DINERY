import { Routes, Route } from "react-router-dom";
import OwnerLayout from "../layouts/OwnerLayout";


 import OwnerDashboard from "../pages/owner/OwnerDashboard";
 import OwnerMenu from "../pages/owner/OwnerMenu";

// import ManageProducts from "../pages/owner/ManageProducts";
// import ManageOrders from "../pages/owner/ManageOrders";
// import SalesAnalytics from "../pages/owner/SalesAnalytics";
// import RestaurantSettings from "../pages/owner/RestaurantSettings";

const OwnerRoutes = () => {
  return (
    <OwnerLayout>
      
      <Routes>
         <Route path="dashboard" element={<OwnerDashboard />} />
         <Route path="menu" element={<OwnerMenu />} />
        {/* <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="analytics" element={<SalesAnalytics />} />
        <Route path="settings" element={<RestaurantSettings />} /> */}
      </Routes>
    </OwnerLayout>
  );
};

export default OwnerRoutes;
