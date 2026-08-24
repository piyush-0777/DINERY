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
import OwnerAnalytics from "../pages/owner/OwnerAnalytics";
import OwnerReports from "../pages/owner/OwnerReports"
import RestaurantSettings from "../pages/owner/RestaurantSettings"
import UpgradePremium from "../pages/owner/UpgradePremium"
import useSocket from '../hooks/useSocket'

import { useSelector, useDispatch } from "react-redux";
import { useLoardDashbord } from "../features/loadside";
import { toast } from "react-toastify";

// import ManageProducts from "../pages/owner/ManageProducts";
// import ManageOrders from "../pages/owner/ManageOrders";
// import SalesAnalytics from "../pages/owner/SalesAnalytics";
// import RestaurantSettings from "../pages/owner/RestaurantSettings";

const OwnerRoutes = () => {
   useSocket()
   const loardDashbord = useLoardDashbord()
   const {socketId} = useSelector(state => state.socketId)
  const [showSplash, setShowSplash] = useState(true);

  
  if(loardDashbord.error) {
    toast.error(error?.message)
  }
    
   

  const initDashboard = async () => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);

  }
  useEffect(() => {
    initDashboard()
  }, []);


   

  return (
    
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" />
        ) : loardDashbord.loading || socketId === null ? (
          <DashboardSkeleton key="skeleton" />
        ) : (
          <OwnerLayout>
          <Routes>
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="menu" element={<OwnerMenu />} />
            <Route path="tables" element={<OwnerTables />} />
            <Route path="orders" element={<OwnerOrder />} />
            <Route path="analytics" element={<OwnerAnalytics />} />
            <Route path="reports" element={<OwnerReports />} />
            <Route path="setting" element={<RestaurantSettings />}/>
             <Route path="getpremium" element={<UpgradePremium />}/>
       
          </Routes>
          </OwnerLayout>
        )}
      </AnimatePresence>

   
  );
};

export default OwnerRoutes;
