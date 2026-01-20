import { Outlet } from "react-router-dom";
// import Sidebar from "../components/common/Sidebar";

const OwnerLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* <Sidebar /> */}
      <div className="w-full p-4">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default OwnerLayout;
