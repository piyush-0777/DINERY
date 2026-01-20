import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import OwnerRoutes from "./OwnerRoutes";
import CustomerRoutes from "./CustomerRoutes";
import { ToastContainer } from "react-toastify";

// Auth Pages


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored" />
        {/* Public Routes */}


        {/* Protected Routes */}
        <Route path="/owner/*" element={<OwnerRoutes />} />
        <Route path="/customer/*" element={<CustomerRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
