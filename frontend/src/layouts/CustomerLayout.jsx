import { Outlet } from "react-router-dom";
// import Navbar from "../components/common/Navbar";

const CustomerLayout = ({ children }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default CustomerLayout;
