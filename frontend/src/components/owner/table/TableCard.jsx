import { TABLE_STATUS_UI, TABLE_STATUS } from "./TableStatus";
import {
  QrCode,
  Trash2,
  Receipt,
  CreditCard,
  Plus
} from "lucide-react";

const TableCard = ({
  table,
  onOpen,
  onAddOrder,
  onShowQR,
  onBill,
  onDelete
}) => {
  const ui = TABLE_STATUS_UI[table.status];

  return (
    <div
      className={`
        relative cursor-pointer group
        bg-neutral-950 border ${ui.color}
        rounded-2xl p-4
        transition-all duration-300
        hover:scale-[1.04]
        hover:shadow-[0_0_30px_-8px_rgba(255,255,255,0.18)]
      `}
    >
      {/* Status dot */}
      <span
        className={`absolute top-3 right-3 w-3 h-3 rounded-full ${ui.dot} animate-pulse`}
      />

      {/* Table info */}
      <h3 className="text-lg font-semibold text-white">
        Table {table.number}
      </h3>

      <p className="text-xs text-neutral-400">
        Capacity: {table.capacity}
      </p>

      <p className="mt-1 text-sm font-medium text-neutral-300">
        {ui.label}
      </p>

      {table.status === TABLE_STATUS.OCCUPIED ? (
  <div className="mt-2 text-sm text-neutral-400">
    🆔 {"#2385"} <br />
    ₹{8907} <br />
    💳 {'panding'}
  </div>
) : (
  table.total && (
    <div className="mt-2 text-sm text-neutral-400">
      ₹{table.total} • ⏱ {table.time}
    </div>
  )
)}

      {table.customer && (
        <div className="mt-2 text-xs text-neutral-500">
          👤 {table.customer.name}
        </div>
      )}

      {/* Hover Overlay */}
      <div
        className="
          absolute inset-0 rounded-2xl
          bg-black/60 opacity-0
          group-hover:opacity-100
          transition-all duration-300
        "
      >
        {/* Bottom Right Actions */}
        <div className="absolute bottom-3 right-3 flex gap-2">
          
          {/* AVAILABLE → ADD ORDER */}
          {table.status === TABLE_STATUS.AVAILABLE && (
            <IconBtn
              title="Add Order"
              onClick={() => onAddOrder(table)}
              color="bg-green-500"
            >
              <Plus size={16} />
            </IconBtn>
          )}

          {/* OCCUPIED / BILL */}
          {(table.status === TABLE_STATUS.OCCUPIED ||
            table.status === TABLE_STATUS.BILL_PENDING) && (
            <IconBtn
              title="View Bill"
              onClick={() => onOpen(table)}
            >
              <Receipt size={16} />
            </IconBtn>
          )}

          {/* PAY BILL */}
          {table.status === TABLE_STATUS.BILL_PENDING && (
            <IconBtn
              title="Pay Bill"
              onClick={() => onBill(table)}
              color="bg-yellow-500 text-black"
            >
              <CreditCard size={16} />
            </IconBtn>
          )}

          {/* QR */}
          <IconBtn
            title="Show QR"
            onClick={() => onShowQR(table.qr)}
          >
            <QrCode size={16} />
          </IconBtn>

          {/* DELETE (only empty table) */}
          {!table.total && (
            <IconBtn
              title="Delete Table"
              onClick={() => onDelete(table._id)}
              color="bg-red-600"
            >
              <Trash2 size={16} />
            </IconBtn>
          )}
        </div>
      </div>
    </div>
  );
};

/* Icon Button */
const IconBtn = ({
  children,
  onClick,
  color = "bg-neutral-800",
  title
}) => (
  <button
    title={title}
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`
      w-9 h-9 flex items-center justify-center
      rounded-xl ${color}
      text-white
      hover:scale-110
      transition
    `}
  >
    {children}
  </button>
);

export default TableCard;
