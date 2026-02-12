import { Outlet } from "react-router-dom";
import { getSocket } from "../consfig/socket";
import useSocket from '../hooks/useSocket'
import { useEffect } from "react";
// import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/owner/Navbar"
import {useSelector} from 'react-redux'

const OwnerLayout = ({ children }) => {
 
  const { loading, success, error, } = useSelector(state => state.loardDashbordState)

  useEffect(() => {
          const socket = getSocket()
          if (!socket){
            console.log('socket is not find')
            return;
          } 
          socket.on("newOrder", (order) => {
            console.log("📦 New Order Received:", order);
            // show toast / play sound / update UI
          });
          socket.on("tableStatusUpdated" , (tableId)=>{
            
          })
      
          return () => {
            socket.off("newOrder");
          };
  
        }, []);
  
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
