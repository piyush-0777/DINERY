import { Outlet } from "react-router-dom";
import { getSocket } from "../consfig/socket";
import { useEffect } from "react";
// import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/owner/Navbar"
import {useSelector , useDispatch} from 'react-redux'
import {getOrderThunk} from '../redux/thunks/ordersThunk'
import {getBillThunk} from '../redux/thunks/billThunk'
import { getTableThunk } from "../redux/thunks/tableThunk";
import { toast } from "react-toastify";

const OwnerLayout = ({ children }) => {
 const dispatch = useDispatch()
  const { loading, success, error, } = useSelector(state => state.loardDashbordState)

  useEffect(() => {
          const socket = getSocket()
          if (!socket){
            console.log('socket is not find')
            return;
          } 
          socket.on("newOrder", ({orderId , billId , tableId}) => {
            console.log("📦 New Order Received:", orderId);
            dispatch(getOrderThunk(orderId))
            dispatch(getBillThunk(billId))
            dispatch(getTableThunk(tableId))
            toast.success("new order is add.");
            // show toast / play sound / update UI
          });
          socket.on("tableStatusUpdated" , (tableId)=>{
              toast.success("table state is update");
              dispatch(getTableThunk(tableId))
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
