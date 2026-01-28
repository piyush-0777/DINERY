import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { QrCode, Receipt, Trash2 } from "lucide-react";

import {
  assignOrderToTable,
  clearTable,
} from "../../../redux/features/table/tablesSlice";

import { TABLE_STATUS_CONFIG } from "./TableStatus";

export default function TableCard({ table }) {
  const dispatch = useDispatch();

  const statusUI = TABLE_STATUS_CONFIG[table.status];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative rounded-2xl bg-neutral-900 p-5 shadow-xl ring-1 transition ${statusUI.ringColor}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Table {table.number}
        </h3>
        <span
          className={`h-3 w-3 rounded-full ${statusUI.dotColor}`}
        />
      </div>

      {/* Status */}
      <p className={`mt-2 text-sm ${statusUI.textColor}`}>
        {statusUI.label}
      </p>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between">
        {/* Assign Order / QR */}
        <button
          onClick={() => dispatch(assignOrderToTable(table.id))}
          className="rounded-lg bg-neutral-800 p-2 text-gray-300 transition hover:scale-110 hover:text-white"
          title="Assign Order / QR"
        >
          <QrCode size={18} />
        </button>

        {/* View Bill */}
        <button
          onClick={() => console.log("View bill for table", table.id)}
          className="rounded-lg bg-neutral-800 p-2 text-gray-300 transition hover:scale-110 hover:text-white"
          title="View Bill"
        >
          <Receipt size={18} />
        </button>

        {/* Clear Table */}
        <button
          onClick={() => dispatch(clearTable(table.id))}
          className="rounded-lg bg-neutral-800 p-2 text-red-400 transition hover:scale-110 hover:text-red-500"
          title="Clear Table"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </motion.div>
  );
}
