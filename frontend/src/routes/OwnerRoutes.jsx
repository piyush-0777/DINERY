import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import OwnerLayout from "../layouts/OwnerLayout";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../components/ui/SplashScreen";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";

import OwnerDashboard from "../pages/owner/OwnerDashboard";
import OwnerMenu from "../pages/owner/OwnerMenu";
import OwnerTables from "../pages/owner/OwnerTables";
import OwnerOrder from "../pages/owner/OwnerOrders";
import OwnerAnalytics from "../pages/owner/OwnerAnalytics";
import OwnerReports from "../pages/owner/OwnerReports";
import RestaurantSettings from "../pages/owner/RestaurantSettings";
import UpgradePremium from "../pages/owner/UpgradePremium";
import SubscriptionGuard from "../components/common/SubscriptionGuard";
import { TrialBanner } from "../features/premium";
import useSocket from "../hooks/useSocket";

import { useSelector } from "react-redux";
import { useLoardDashbord } from "../features/loadside";
import { toast } from "react-toastify";

const OwnerRoutes = () => {
  useSocket();
  const loardDashbord = useLoardDashbord();
  const { socketId } = useSelector((state) => state.socketId);
  const restaurantState = useSelector((state) => state.restaurant);
  const [showSplash, setShowSplash] = useState(true);

  const subscription =
    restaurantState?.subscription ||
    loardDashbord?.data?.subscription ||
    null;

  if (loardDashbord.error) {
    toast.error(loardDashbord.error?.message);
  }

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" />
      ) : loardDashbord.loading || socketId === null ? (
        <DashboardSkeleton key="skeleton" />
      ) : (
        <OwnerLayout>
          {/* Trial & Expiry Countdown Banner */}
          <TrialBanner subscription={subscription} />

          <Routes>
            <Route path="dashboard" element={<OwnerDashboard />} />

            {/* Paywall-Guarded Operational Routes */}
            <Route
              path="menu"
              element={
                <SubscriptionGuard subscription={subscription}>
                  <OwnerMenu />
                </SubscriptionGuard>
              }
            />
            <Route
              path="tables"
              element={
                <SubscriptionGuard subscription={subscription}>
                  <OwnerTables />
                </SubscriptionGuard>
              }
            />
            <Route
              path="orders"
              element={
                <SubscriptionGuard subscription={subscription}>
                  <OwnerOrder />
                </SubscriptionGuard>
              }
            />
            <Route
              path="analytics"
              element={
                <SubscriptionGuard subscription={subscription}>
                  <OwnerAnalytics />
                </SubscriptionGuard>
              }
            />
            <Route
              path="reports"
              element={
                <SubscriptionGuard subscription={subscription}>
                  <OwnerReports />
                </SubscriptionGuard>
              }
            />

            {/* Always Accessible for Upgrading & Account Recovery */}
            <Route path="setting" element={<RestaurantSettings />} />
            <Route path="getpremium" element={<UpgradePremium />} />
          </Routes>
        </OwnerLayout>
      )}
    </AnimatePresence>
  );
};

export default OwnerRoutes;
