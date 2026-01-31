import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import OwnerLayout from "../layouts/OwnerLayout";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../components/ui/SplashScreen";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import OwnerMenu from "../pages/owner/OwnerMenu";
import OwnerTables from "../pages/owner/OwnerTables"
import OwnerOrder from "../pages/owner/OwnerOrders";

import { loadDashbordThunk } from '../redux/thunks/loardDashbordThunk'
import { useSelector, useDispatch } from "react-redux";

// import ManageProducts from "../pages/owner/ManageProducts";
// import ManageOrders from "../pages/owner/ManageOrders";
// import SalesAnalytics from "../pages/owner/SalesAnalytics";
// import RestaurantSettings from "../pages/owner/RestaurantSettings";

const OwnerRoutes = () => {

  const dispatch = useDispatch()
  const { loading, success, error, } = useSelector(state => state.loardDashbordState)
  // console.log('owner route', { loading, success, error, })
  const [showSplash, setShowSplash] = useState(true);

  const initDashboard = async () => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

  }
  useEffect(() => {

    initDashboard()
  }, []);
  useEffect(() => {
    if (!showSplash) {
      dispatch(loadDashbordThunk())
    }
  }, [showSplash]);

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
            <Route path="tables" element={<OwnerTables />} />
            <Route path="orders" element={<OwnerOrder />} />
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
