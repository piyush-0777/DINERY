import { Outlet } from "react-router-dom";
// import Navbar from "../components/common/Navbar";

const CustomerLayout = ({ children }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="p-4">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default CustomerLayout;
