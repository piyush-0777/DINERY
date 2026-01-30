import { useSelector , useDispatch} from "react-redux";
import { useState } from "react";

import TableCard from "../../components/owner/table/TableCard";
import TableDetailsModal from "../../components/owner/table/TableDetailsModal";
import QRPopup from "../../components/owner/table/QRPopup";
import MergeSplitModal from "../../components/owner/table/MergeSplitModal";
import AddTableModal from "../../components/owner/table/AddTableModal"


import {addTableThunk , deleteTableThunk} from '../../redux/thunks/tableThunk'


export default function TablesPage() {

  const dispatch = useDispatch() 

  const tables = useSelector(state => state.tables.tables);
  console.log(tables)
  const loardTable = useSelector(state => state.loardtables)
  console.log('table',loardTable)

  const [selectedTable, setSelectedTable] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);


  const handleAddTable = (data) => {
    dispatch(addTableThunk(data))
  }
  const onDeleteTable = (id) =>{
    dispatch(deleteTableThunk(id))
  }


  return (
    <div className="p-6 bg-black min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Tables</h1>

        <div className="flex gap-3">
          {/* Add Table */}
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-full backdrop-blur-md border
              bg-black/70 border-yellow-400/40 text-yellow-400
              hover:border-yellow-500 hover:cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➕ Add Table
          </button>

          {/* Merge / Split */}
          <button
            onClick={() => setShowMergeModal(true)}
            className="px-4 py-2 rounded-xl
                 bg-neutral-900 text-white
                 hover:bg-neutral-800
                 hover:scale-105 transition"
          >
            🔀 Merge / Split
          </button>
        </div>
      </div>
      {/* Table Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {tables.map(table => (
          <TableCard
            key={table.id}
            table={table}
            onOpen={() => setSelectedTable(table)}
            onShowQR={() => setQrImage(table.qrImage)}
            onDelete={onDeleteTable}
          />
        ))}
      </div>

      {/* 🔳 Modals */}
      <TableDetailsModal
        table={selectedTable}
        onClose={() => setSelectedTable(null)}
      />

      <QRPopup
        qr={qrImage}
        onClose={() => setQrImage(null)}
      />

      {showMergeModal && (
        <MergeSplitModal
          tables={tables}
          onClose={() => setShowMergeModal(false)}
        />
      )}
      {showAddModal && (
  <AddTableModal
    onAdd={handleAddTable}
    onClose={() => setShowAddModal(false)}
  />
)}
    </div>
  );
}
