import { TABLE_STATUS_UI, TABLE_STATUS } from "./TableStatus";
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
  onDelete,
  onChangeTableStatus,
  onChangeOrderStatus
}) => {
  const ui = TABLE_STATUS_UI[table.status];

  /* 🔄 NEXT TABLE STATE */
  const getNextTableState = () => {
    switch (table.status) {
      case TABLE_STATUS.AVAILABLE:
        return TABLE_STATUS.OCCUPIED;
      case TABLE_STATUS.OCCUPIED:
        return TABLE_STATUS.BILL_PENDING;
      case TABLE_STATUS.BILL_PENDING:
        return TABLE_STATUS.AVAILABLE;
      default:
        return TABLE_STATUS.AVAILABLE;
    }
  };

  /* 🔄 NEXT ORDER STATE */
  const getNextOrderState = () => {
    const current = table.orderStatus || "pending";

    if (current === "pending") return "preparing";
    if (current === "preparing") return "served";
    return "pending";
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

{/* 🔻 DIVIDER (ONLY if OCCUPIED) */}
{table.status === TABLE_STATUS.OCCUPIED && (
  <div className="my-3 border-t border-neutral-800" />
)}

{/* 🍽 ORDER SECTION */}
{table.status === TABLE_STATUS.OCCUPIED && (
  <div className="space-y-2">

    <div className="flex justify-between items-center">
      <p className="text-sm font-semibold text-neutral-300">
        Order Details
      </p>

      <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
        {table.orderStatus || "pending"}
      </span>
    </div>

    <div className="flex justify-between text-sm text-neutral-400">
      <span>Order ID</span>
      <span className="text-white">#2385</span>
    </div>

    <div className="flex justify-between text-sm text-neutral-400">
      <span>Total</span>
      <span className="text-green-400 font-semibold">
        ₹{8907}
      </span>
    </div>

    <div className="flex justify-between text-sm text-neutral-400">
      <span>Payment</span>
      <span className="text-white">Pending</span>
    </div>
  </div>
)}

      {/* Hover Overlay */}
      <div className="
        absolute inset-0 rounded-2xl
        bg-black/70 backdrop-blur-sm
        opacity-0 group-hover:opacity-100
        transition-all duration-300
        flex flex-col justify-between p-4
      ">

        {/* 🔄 SWITCH BUTTONS */}
        <div className="flex flex-col gap-3">

          {/* TABLE SWITCH */}
          <SwitchBtn
            label="Switch Table State"
            onClick={() =>
              onChangeTableStatus?.(table, getNextTableState())
            }
          />

          {/* ORDER SWITCH */}
          {table.status === TABLE_STATUS.OCCUPIED && (
            <SwitchBtn
              label="Switch Order State"
              onClick={() =>
                onChangeOrderStatus?.(table, getNextOrderState())
              }
            />
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-2">
          {table.status === TABLE_STATUS.AVAILABLE && (
            <IconBtn onClick={() => onAddOrder(table)} color="bg-green-500">
              <Plus size={16} />
            </IconBtn>
          )}

          {(table.status === TABLE_STATUS.OCCUPIED ||
            table.status === TABLE_STATUS.BILL_PENDING) && (
            <IconBtn onClick={() => onOpen(table)}>
              <Receipt size={16} />
            </IconBtn>
          )}

          {table.status === TABLE_STATUS.BILL_PENDING && (
            <IconBtn onClick={() => onBill(table)} color="bg-yellow-400 text-black">
              <CreditCard size={16} />
            </IconBtn>
          )}

          <IconBtn onClick={() => onShowQR(table.qr)}>
            <QrCode size={16} />
          </IconBtn>

          {!table.total && (
            <IconBtn onClick={() => onDelete(table._id)} color="bg-red-600">
              <Trash2 size={16} />
            </IconBtn>
          )}
        </div>
      </div>
    </div>
  );
};

/* 🔘 SWITCH BUTTON (PREMIUM UI) */
const SwitchBtn = ({ label, onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className="
      w-full flex items-center justify-between
      px-3 py-2 rounded-xl
      bg-neutral-800 text-white text-sm
      hover:bg-neutral-700
      transition-all duration-200
    "
  >
    {label}
    <RefreshCw size={16} className="opacity-70" />
  </button>
);

/* ICON BUTTON */
const IconBtn = ({
  children,
  onClick,
  color = "bg-neutral-800"
}) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`
      w-9 h-9 flex items-center justify-center
      rounded-xl ${color}
      text-white
      hover:scale-110 hover:shadow-lg
      transition
    `}
  >
    {children}
  </button>
);

export default TableCard;