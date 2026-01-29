import { TABLE_STATUS_UI } from "./TableStatus";

const TableDetailsModal = ({ table, onClose }) => {
  if (!table) return null;

  const ui = TABLE_STATUS_UI[table.status];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl
                      w-[440px] p-5 animate-scaleIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Table {table.number}
            </h2>
            <p className={`text-sm ${ui.color}`}>
              {ui.label}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Customer */}
        {table.customer && (
          <div className="mb-4 p-3 rounded-xl bg-neutral-900 text-sm text-neutral-300">
            <p>👤 {table.customer.name}</p>
            <p>📞 {table.customer.phone}</p>
          </div>
        )}

        {/* Order items */}
        <div className="space-y-2 max-h-[200px] overflow-auto">
          {table.items?.length ? (
            table.items.map(item => (
              <div
                key={item.id}
                className="flex justify-between text-neutral-300 text-sm"
              >
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price}</span>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 text-sm">
              No order items
            </p>
          )}
        </div>

        {/* Total */}
        <div className="mt-4 border-t border-neutral-800 pt-3 flex justify-between">
          <span className="text-white font-medium">Total</span>
          <span className="text-white font-semibold">
            ₹{table.total || 0}
          </span>
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="mt-5 w-full py-2 rounded-xl
                     bg-white text-black font-medium
                     hover:bg-neutral-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TableDetailsModal;
