import React, { useEffect, useState } from "react";
import { useSelector , useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import StatusBadge from "../../components/customer/StatusBadge";
import OrderTimeline from "../../components/customer/OrderTimeline";
import OrderItems from "../../components/customer/OrderItems";
import BillSummary from "../../components/customer/BillSummary";
import PayNowCard from "../../components/customer/PayNowCard";

import { getSocket } from "../../consfig/socket";
import {updateOrderStatus , updateBillStatus} from "../../redux/features/customer/customerSlice"

const CustomerOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const placedOrder = useSelector((state) => state.customer.placedOrder);

  const [status, setStatus] = useState(
    placedOrder?.order?.status || "pending"
  );

  useEffect(() => {
    if (!placedOrder) return;

    setStatus(placedOrder.order.status);
  }, [placedOrder]);

  // Socket Example
  useEffect(() => {
    const socket = getSocket()
    socket.on("orderStatusUpdated", ({ orderId, status }) => {
        console.log({ orderId, status })
        dispatch(updateOrderStatus( {status , orderId}))
        toast.info(`Order ${status}`);
    });
    socket.on("BillStatusUpdated", ({ billId, status }) => {
        console.log({ billId, status })
        dispatch(updateBillStatus( {status , billId}))
        toast.info(`Bill ${status}`);
    });

    return ()=> socket.off("orderStatusUpdated");
    
  }, []);

  if (!placedOrder) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">No active order.</p>
      </div>
    );
  }

  const { order, bill } = placedOrder;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">

      <div className="w-full max-w-[430px]">

        {/* Header */}

        <div className="sticky top-0 bg-white shadow-sm z-20">

          <div className="flex items-center gap-3 p-4">

            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>

            <div>

              <h1 className="font-bold text-xl">
                My Order
              </h1>

              <p className="text-sm text-gray-500">
                Track your order live
              </p>

            </div>

          </div>

        </div>

        <div className="p-4 space-y-5 pb-28">

          {/* Status */}

          <AnimatePresence mode="wait">

            <motion.div
              key={status}
              initial={{ scale: .95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: .95, opacity: 0 }}
            >

              <div className="bg-white rounded-3xl p-5 shadow">

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-gray-500 text-sm">
                      Current Status
                    </p>

                    <StatusBadge status={status} />

                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2
                    }}
                    className="text-4xl"
                  >
                    🍽️
                  </motion.div>

                </div>

              </div>

            </motion.div>

          </AnimatePresence>

          {/* Timeline */}

          <OrderTimeline status={status} />

          {/* Items */}

          <OrderItems items={order.items} />

          {/* Bill */}

          <BillSummary bill={bill} />

          {/* Pay */}

          {status === "completed" && (
            <PayNowCard bill={bill} />
          )}

          {/* Cancel */}

          {status === "cancelled" && (

            <div className="bg-red-50 border border-red-300 rounded-3xl p-5">

              <h2 className="font-bold text-red-600">
                Order Cancelled
              </h2>

              <p className="text-red-500 text-sm mt-2">
                Please contact the restaurant for more information.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default CustomerOrder;