import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import OwnerLayout from "../layouts/OwnerLayout";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../components/ui/SplashScreen";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";

 import OwnerDashboard from "../pages/owner/OwnerDashboard";
 import OwnerMenu from "../pages/owner/OwnerMenu";

// import ManageProducts from "../pages/owner/ManageProducts";
// import ManageOrders from "../pages/owner/ManageOrders";
// import SalesAnalytics from "../pages/owner/SalesAnalytics";
// import RestaurantSettings from "../pages/owner/RestaurantSettings";

const OwnerRoutes = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

    return () => clearTimeout(splashTimer);
  }, []);
  useEffect(()=>{
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  })
  return (
    <OwnerLayout>
      <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : loading ? (
        <DashboardSkeleton key="skeleton" />
      ) : (
        <Routes>
         <Route path="dashboard" element={<OwnerDashboard />} />
         <Route path="menu" element={<OwnerMenu />} />
        {/* <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        <Route path="orders" element={<ManageOrders />} />
        <Route path="analytics" element={<SalesAnalytics />} />
        <Route path="settings" element={<RestaurantSettings />} /> */}
      </Routes>
      )}
    </AnimatePresence>
      
    </OwnerLayout>
  );
};

export default OwnerRoutes;
