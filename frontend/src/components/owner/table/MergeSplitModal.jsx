const MergeSplitModal = ({ tables, onMerge, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-950 p-5 rounded-2xl w-[400px]">
        <h3 className="text-white text-lg mb-4">
          Merge Tables
        </h3>

        {tables.map(t => (
          <label key={t.id} className="flex items-center gap-2 text-neutral-300">
            <input type="checkbox" />
            Table {t.number}
          </label>
        ))}

        <button
          onClick={onMerge}
          className="mt-4 w-full py-2 bg-white text-black rounded-xl"
        >
          Merge Selected
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full py-2 text-neutral-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MergeSplitModal;
