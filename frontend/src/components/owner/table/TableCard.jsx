import { TABLE_STATUS_UI, TABLE_STATUS } from "./TableStatus";

const TableCard = ({ table, onOpen, onAddOrder, onShowQR, onBill }) => {
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

      {/* If order exists */}
      {table.total && (
        <div className="mt-2 text-sm text-neutral-400">
          🧾 ₹{table.total} • ⏱️ {table.time}
        </div>
      )}

      {/* Customer info */}
      {table.customer && (
        <div className="mt-2 text-xs text-neutral-500">
          👤 {table.customer.name}
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 rounded-2xl
        bg-black/60 opacity-0
        group-hover:opacity-100
        transition-all duration-300
        flex flex-col items-center justify-center gap-3"
      >
        {/* AVAILABLE → ADD ORDER */}
        {table.status === TABLE_STATUS.AVAILABLE && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddOrder(table);
            }}
            className="px-4 py-2 rounded-xl bg-green-500 text-black font-medium
                       hover:bg-green-400 transition"
          >
            ➕ Add Order
          </button>
        )}

        {/* OCCUPIED / BILL PENDING */}
        {(table.status === TABLE_STATUS.OCCUPIED ||
          table.status === TABLE_STATUS.BILL_PENDING) && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen(table);
              }}
              className="px-4 py-2 rounded-xl bg-white text-black
                         hover:bg-neutral-200 transition"
            >
              🧾 View Bill
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onBill(table);
              }}
              className="px-4 py-2 rounded-xl bg-yellow-500 text-black
                         hover:bg-yellow-400 transition"
            >
              💳 Pay Bill
            </button>
          </>
        )}

        {/* QR */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowQR(table.qr);
          }}
          className="absolute bottom-3 right-3 text-xs px-3 py-1 rounded-full
                     bg-neutral-800 text-white hover:bg-neutral-700 transition"
        >
          QR
        </button>
        {!table.total && (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onDelete(table.id);
    }}
    className="px-4 py-2 rounded-xl
               bg-red-600 text-white
               hover:bg-red-500 transition"
  >
    🗑 Delete
  </button>
)}

      </div>
    </div>
  );
};

export default TableCard;
