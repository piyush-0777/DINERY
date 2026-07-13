import { TABLE_STATUS_UI } from "./TableStatus";

const TableDetailsModal = ({ table, onClose }) => {
  if (!table) return null;

  const ui = TABLE_STATUS_UI[table.status];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div
        className="bg-neutral-950 border border-neutral-800 rounded-2xl
                   w-[500px] p-5 animate-scaleIn"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Table {table.tableId}
            </h2>

            <p className={`text-sm font-medium ${ui.color}`}>
              {ui.label}
            </p>

            <p className="text-xs text-neutral-500 mt-1">
              Capacity : {table.capacity} People
            </p>

            {table.activeSince && (
              <p className="text-xs text-neutral-500">
                Active Since :{" "}
                {new Date(table.activeSince).toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Customer */}
        {table.customer && (
          <div className="mb-5 rounded-xl bg-neutral-900 p-4">
            <h3 className="text-white font-medium mb-2">
              Customer Details
            </h3>

            <div className="text-sm text-neutral-300 space-y-1">
              <p>👤 {table.customer.name}</p>
              <p>📞 {table.customer.phone}</p>
            </div>
          </div>
        )}

        {/* Order */}
        {table.order && (
          <>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-medium">
                Order Items
              </h3>

              <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300 capitalize">
                {table.order.status}
              </span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {table.order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-neutral-800 pb-2"
                >
                  <div>
                    <p className="text-white">
                      {item?.name}
                    </p>

                    <p className="text-xs text-neutral-500">
                      ₹{item?.price} × {item?.quantity}
                    </p>
                  </div>

                  <p className="text-green-400 font-medium">
                    ₹{item?.subtotal}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-neutral-800 pt-4 space-y-2">
              <div className="flex justify-between text-neutral-300">
                <span>Order Status</span>
                <span className="capitalize">
                  {table.order.status}
                </span>
              </div>

              <div className="flex justify-between text-white text-lg font-semibold">
                <span>Total</span>
                <span>₹{table.order.totalAmount}</span>
              </div>
            </div>
          </>
        )}

        {!table.order && (
          <div className="text-center text-neutral-500 py-8">
            No Order Found
          </div>
        )}

        {/* Footer */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-white py-2.5 font-medium text-black hover:bg-neutral-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TableDetailsModal;