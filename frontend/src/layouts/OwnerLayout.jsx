import { Outlet } from "react-router-dom";
// import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/owner/Navbar"

const OwnerLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default OwnerLayout;
