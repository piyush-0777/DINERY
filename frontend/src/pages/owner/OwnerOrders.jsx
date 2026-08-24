import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCashPayment } from "../../features/bill";
import {
  OrderCard,
  OrderDetailModal,
  OrderFilters,
} from "../../features/order";
import React from "react";
import { toast } from "react-toastify";

export default function OwnerOrder() {
  const { list } = useSelector((s) => s.orders);
  const cashPayment = useCashPayment();

  const bills = useSelector((s) => s.bills.bill);

  const [filter, setFilter] = useState("Today");
  const [selectedOrder, setSelectedOrder] = useState();
  const [updateStatus, setUpdateStatus] = useState();

  const filerOrder = useMemo(() => {
    if (filter === "Today") {
      return list;
    } else {
      return list.filter((e) => e.status === filter);
    }
  }, [filter]);

  const handelcashPayment = async (billId, tableId) => {
    try {
      const result = await cashPayment.cashPayment({ billId, tableId });
      setSelectedOrder(null);
      toast.success("Payment completed successfully.");
    } catch (error) {
      if (err?.status === 500) {
        toast.error("Server down");
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      <h1 className="text-white text-2xl font-bold mb-4">Orders</h1>
      <OrderFilters active={filter} setActive={setFilter} />

      <div className="grid gap-4">
        {filerOrder.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            setSelectedOrder={setSelectedOrder}
            setUpdateStatus={setUpdateStatus}
            updateStatus={updateStatus}
          />
        ))}
      </div>
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          bill={bills.filter((e) => e.order === selectedOrder._id)[0]}
          onClose={() => {
            setSelectedOrder(null);
          }}
          onCashPayment={handelcashPayment}
          loading={cashPayment.loading}
        />
      )}
    </div>
  );
}
