import { Routes, Route, Navigate } from "react-router-dom";
import CustomerLayout from "../layouts/CustomerLayout";
import { useState , useEffect } from "react";
import {  useParams , useNavigate } from 'react-router-dom';
import CustomerHome from "../pages/customer/CustomerHome";
import CustoemrOrder from "../pages/customer/CustoemrOrder";
import CustomerBill from "../pages/customer/CustomerBill";
import DashboardSkeleton from "../components/ui/DashboardSkeleton";
import InvalidSession from "../pages/customer/InvalidSession"; // Create this page
import useSocket from "../hooks/useSocket";
import { useSelector , useDispatch } from "react-redux";

import {useLoadCustomerDashbord} from '../features/customer'

const CustomerRoutes = () => {
  const token = localStorage.getItem("token");
  const loadCustomerDashbord = useLoadCustomerDashbord();
   if (!token) {
    return <Navigate to="/customer/invalid-session" replace />;
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { socketId } = useSelector((state) => state.socketId);
  const [connectSocket, setConnectSocket] = useState(false);
 const {  restaurantName } = useParams();
 useSocket(connectSocket);

useEffect(() => {
  const load = async () => {

    try {
      const result = await loadCustomerDashbord.loadCustomerDashbord({
        restaurantName,
        token,
      });
      console.log('loadreq is dun')
      setConnectSocket(true);
    } catch (error) {
      console.error('Error loading customer dashboard:', error);
      navigate("/customer/invalid-session", { replace: true });
    }
  };

  if (token) {
    load();
  }
}, [loadCustomerDashbord, token, restaurantName]);
  // No token -> don't even connect to customer pages


  return (
    <CustomerLayout>
      {socketId === null ? (
        <DashboardSkeleton />
      ) : (
        <Routes>
          <Route path="CustomerHome" element={<CustomerHome />} />
          <Route path="CustomerBill" element={<CustomerBill />} />
          <Route path="CustomerOrderDeteal" element={<CustoemrOrder />} />

          {/* Invalid session page */}
          <Route path="invalid-session" element={<InvalidSession />} />

          {/* Unknown customer routes */}
          <Route
            path="*"
            element={<Navigate to="CustomerHome" replace />}
          />
        </Routes>
      )}
    </CustomerLayout>
  );
};

export default CustomerRoutes;