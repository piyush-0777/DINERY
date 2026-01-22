import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import CustomerLogin from "../pages/customer/CustomerLogin"
 import OwnerRoutes from "./OwnerRoutes";
 import CustomerRoutes from "./CustomerRoutes";
import { ToastContainer } from "react-toastify";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Auth Pages


const AppRoutes = () => {
  return (
    <Router>
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
          theme="dark" />
      <Routes>
        
        {/* Public Routes */}
        
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        
        
        <Route path="/customer" element={<CustomerLayout />}>
          <Route path="CustomerLogin/:tableID" element={<CustomerLogin />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/owner/*" element={<OwnerRoutes />} />
        <Route path="/customer/*" element={<CustomerRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
