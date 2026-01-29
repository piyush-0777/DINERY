import { useState } from "react";

const AddTableModal = ({ onAdd, onClose }) => {
  const [number, setNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 w-[380px] animate-scaleIn">

        <h2 className="text-white text-lg font-semibold mb-4">
          Add New Table
        </h2>

        <input
          placeholder="Table Number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg
                     bg-neutral-900 text-white border border-neutral-700"
        />

        <input
          placeholder="Capacity"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          className="w-full mb-4 p-2 rounded-lg
                     bg-neutral-900 text-white border border-neutral-700"
        />

        <button
          onClick={() => onAdd(number, capacity)}
          className="w-full py-2 rounded-xl
                     bg-green-600 text-black font-medium
                     hover:bg-green-500 transition"
        >
          Add Table
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2 text-neutral-400 hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddTableModal;
