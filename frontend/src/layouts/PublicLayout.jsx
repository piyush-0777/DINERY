import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import {Outlet} from "react-router-dom"

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white font-body">
      {/* <Navbar /> */}
      <main className="pt-0">{children || <Outlet />}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
