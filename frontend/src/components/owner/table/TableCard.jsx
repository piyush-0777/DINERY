import { TABLE_STATUS_UI, TABLE_STATUS } from "./TableStatus";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateStatusThunk, deleteTableThunk } from "../../../redux/thunks/tableThunk";
import { updateOrderStatusThunk } from "../../../redux/thunks/ordersThunk"
import {resetOrderLoadSlice} from "../../../redux/features/order/ordersSlice"
import { resetLoardTablesState} from "../../../redux/features/table/loardTablesSlice"
import {
  QrCode,
  Trash2,
  Receipt,
  CreditCard,
  Plus,
  RefreshCw
} from "lucide-react";

const TableCard = ({
  table,
  onOpen,
  onAddOrder,
  onShowQR,
  onBill,

}) => {
  const ui = TABLE_STATUS_UI[table.status];
  const dispatch = useDispatch()

  // reqtype: updateOrerStatus when call change status
  const { loading, reqtype, error, success } = useSelector(state => state.orders) // this is for order loading
  const tableLoadState = useSelector(state => state.loardtables);// this is for table loading
  // have tableLoadState.loading , tableLoadState.reqtype , tableLoadState.error , tableLoadState.success
  // for delet tableLoadState.reqtype == 'deleteTable'
  // for updatetableStatue tableLoadState.reqtype == 'updateStatus'


  
// console.log( { loading, reqtype, error, success })
  const updatingTable =
    tableLoadState.loading && tableLoadState.reqtype === "updateStatus";

  const deletingTable =
    tableLoadState.loading && tableLoadState.reqtype === "deleteTable";

  const updatingOrder =
    loading && reqtype === "updateOrderStatus";

  const [elapsed, setElapsed] = useState("00:00");

  useEffect(() => {
    if (table.status !== TABLE_STATUS.ACTIVE || !table.activeSince) {
      setElapsed("00:00");
      return;
    }

    const updateTimer = () => {
      const diff = Math.floor(
        (Date.now() - new Date(table.activeSince).getTime()) / 1000
      );

      const hours = Math.floor(diff / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setElapsed(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [table.status, table.activeSince]);

  /* 🔄 NEXT TABLE STATE */
  const getNextOrderState = () => {
    switch (table?.order?.status) {
      case "pending":
        return "preparing";

      case "preparing":
        return "served";

      case "served":
      return "completed";

      default:
        return null;
    }
  };

  // change table state active to availabel
  const onChangeTableStatus = async (table, status) => {
    try {
      
      const result = await dispatch(updateStatusThunk({id:table?._id, status}));

      if (updateStatusThunk.fulfilled.match(result)) {
        toast.success("Table status updated.");
        dispatch(resetLoardTablesState())
      } else {
        toast.error(result.payload || "Failed to update table.");
         dispatch(resetLoardTablesState())
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  };

  // order status change
  const onChangeOrderStatus = async (id, status) => {
    try {
      const result = await dispatch(
        updateOrderStatusThunk({ id, status })
      );

      if (updateOrderStatusThunk.fulfilled.match(result)) {
        toast.success("Order status updated.");
        dispatch(resetOrderLoadSlice())
      } else {
        toast.error(result.payload || "Failed to update order.");
        dispatch(resetOrderLoadSlice())
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  };

  // delet table 
  const onDelete = async (id) => {
    if (!window.confirm("Delete this table?")) return;

    try {
      const result = await dispatch(deleteTableThunk(id));

      if (deleteTableThunk.fulfilled.match(result)) {
        toast.success("Table deleted.");
        dispatch(resetLoardTablesState())
      } else {
        toast.error(result.payload || "Failed to delete table.");
        dispatch(resetLoardTablesState())
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    }
  };

  return (
    <div
      className={`
        relative group cursor-pointer
        bg-gradient-to-br from-neutral-900 to-neutral-950
        border ${ui.color}
        rounded-2xl p-5
        transition-all duration-300
        hover:scale-[1.05]
        hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.9)]
      `}
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute inset-0 bg-white/5 blur-xl" />
      </div>

      {/* Status Dot */}
      <span className={`absolute top-3 right-3 w-3 h-3 rounded-full ${ui.dot}`} />

      {/* Info */}
      {/* 🔷 TABLE SECTION */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-white tracking-wide">
            Table {table.number}
          </h3>

          <span
            className={`
        text-xs px-2 py-1 rounded-full
        ${ui.color} bg-opacity-20
      `}
          >
            {ui.label}
          </span>
        </div>

        <div className="flex justify-between text-sm text-neutral-400">
          <span>Capacity</span>
          <span className="text-white font-medium">{table.capacity}</span>
        </div>

        {table.customer && (
          <div className="flex justify-between text-sm text-neutral-400">
            <span>Customer</span>
            <span className="text-white">{table.customer.name}</span>
          </div>
        )}
      </div>

      {table.status === TABLE_STATUS.ACTIVE && (
        <div className="flex justify-between text-sm text-neutral-400">
          <span>Active For</span>
          <span className="text-yellow-400 font-semibold">
            {elapsed}
          </span>
        </div>
      )}

      {/* 🔻 DIVIDER (ONLY if OCCUPIED) */}
      {(table.status === TABLE_STATUS.ACTIVE ||
        table.status === TABLE_STATUS.OCCUPIED) && (
          <div className="my-3 border-t border-neutral-800" />
        )}

      {/* 🍽 ORDER SECTION */}
      {table.status === TABLE_STATUS.OCCUPIED && (
        <div className="space-y-2">

          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-neutral-300">
              Order Details
            </p>

            <span
              className={`text-xs px-2 py-1 rounded-full
    ${table?.order?.status === "pending"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : table?.order?.status === "preparing"
                    ? "bg-blue-500/20 text-blue-400"
                    : table?.order?.status === "served"
                      ? "bg-green-500/20 text-green-400"
                      : table?.order?.status === "completed"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-red-500/20 text-red-400"
                }
  `}
            >
              {table?.order?.status}
            </span>
          </div>

          <div className="flex justify-between text-sm text-neutral-400">
            <span>Order ID</span>
            <span className="text-white">#2385</span>
          </div>

          <div className="flex justify-between text-sm text-neutral-400">
            <span>Total</span>
            <span className="text-green-400 font-semibold">
              ₹{table?.order?.totalAmount}
            </span>
          </div>

          <div className="flex justify-between text-sm text-neutral-400">
            <span>Payment</span>
            <span className="text-white">Pending</span>
          </div>
        </div>
      )}

      {/* Hover Overlay */}
      {/* Hover Overlay */}
      <div
        className="
    absolute inset-0 rounded-2xl
    bg-black/70 backdrop-blur-sm
    opacity-0 group-hover:opacity-100
    transition-all duration-300
    flex flex-col justify-between p-4
  "
      >
        <div className="flex flex-col gap-3">

          {/* ACTIVE */}
          {table.status === TABLE_STATUS.ACTIVE && (
            <SwitchBtn
              loading={updatingTable}
              label="Mark Available"
              onClick={() =>
                onChangeTableStatus(table, TABLE_STATUS.AVAILABLE)
              }
            />
          )}

          {/* OCCUPIED */}
          {table.status === TABLE_STATUS.OCCUPIED &&
            table?.order?.status !== "completed" &&
            table?.order?.status !== "cancelled" && (
              <SwitchBtn
                loading={updatingOrder}
                label={`Mark ${getNextOrderState()}`}
                onClick={() =>
                  onChangeOrderStatus(
                    table?.order?._id,
                    getNextOrderState()
                  )
                }
              />
            )}

        </div>

        <div className="flex justify-end gap-2">

          {/* AVAILABLE */}
          {table.status === TABLE_STATUS.AVAILABLE && (
            <>
              <IconBtn
                loading={updatingOrder}
                onClick={() => onAddOrder(table)}
                color="bg-green-600"
              >
                <Plus size={16} />
              </IconBtn>

              <IconBtn
                loading={updatingOrder}
                onClick={() => onShowQR(table.qr)}>
                <QrCode size={16} />
              </IconBtn>

              <IconBtn
                loading={deletingTable}
                onClick={() => onDelete(table._id)}
                color="bg-red-600"
              >
                <Trash2 size={16} />
              </IconBtn>
            </>
          )}

          {/* ACTIVE */}
          {table.status === TABLE_STATUS.ACTIVE && (
            <>
              <IconBtn
                onClick={() => onAddOrder(table)}
                color="bg-green-600"
              >
                <Plus size={16} />
              </IconBtn>

              <IconBtn onClick={() => onShowQR(table.qr)}>
                <QrCode size={16} />
              </IconBtn>
            </>
          )}

          {/* OCCUPIED */}
          {table.status === TABLE_STATUS.OCCUPIED && (
            <>
              <IconBtn onClick={() => onOpen(table)}>
                <Receipt size={16} />
              </IconBtn>

              {table?.order?.status === "completed" && (
                <IconBtn
                  onClick={() => onBill(table?.order._id)}
                  color="bg-emerald-600"
                >
                  <CreditCard size={16} />
                </IconBtn>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};

/* 🔘 SWITCH BUTTON (PREMIUM UI) */
const SwitchBtn = ({
  label,
  onClick,
  loading = false
}) => (
  <button
    disabled={loading}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`
      w-full flex items-center justify-between
      px-3 py-2 rounded-xl
      text-white text-sm
      transition-all duration-200
      ${loading
        ? "bg-neutral-700 opacity-60 cursor-not-allowed"
        : "bg-neutral-800 hover:bg-neutral-700"
      }
    `}
  >
    {loading ? "Please wait..." : label}

    {!loading && <RefreshCw size={16} className="opacity-70" />}
  </button>
);

/* ICON BUTTON */
const IconBtn = ({
  children,
  onClick,
  color = "bg-neutral-800",
  loading = false
}) => (
  <button
    disabled={loading}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`
      w-9 h-9 flex items-center justify-center
      rounded-xl text-white transition
      ${loading
        ? "bg-neutral-700 opacity-60 cursor-not-allowed"
        : `${color} hover:scale-110 hover:shadow-lg`
      }
    `}
  >
    {loading ? (
      <RefreshCw size={16} className="animate-spin" />
    ) : (
      children
    )}
  </button>
);

export default TableCard;