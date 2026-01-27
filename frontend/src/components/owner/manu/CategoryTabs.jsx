import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import Spinner from "../../ui/Spiner"; // adjust path if needed

const CategoryTabs = ({
  category,
  active,
  onClick,
  onEdit,
  onDelete,
  deletingId
}) => {

  const { loading, reqtyp } = useSelector(state => state.addcategory);


  const isDeleting =
    loading &&
    reqtyp === "delete" &&
    deletingId === category._id;

  return (
    <div
      onClick={onClick}
      className={`relative min-w-[120px] h-28 shrink-0 rounded-2xl overflow-hidden cursor-pointer group transition
        ${active ? "ring-2 ring-yellow-400" : "ring-1 ring-neutral-800"}
      `}
    >
      {/* fallback bg */}
      <div className="absolute inset-0 bg-neutral-800" />

      {/* image */}
      <img
        src={category.image}
        alt={category.name}
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      {/* overlay */}
      <div className="absolute inset-0 z-20 bg-black/40 group-hover:bg-black/20 transition" />

      {/* actions */}
      <div
        className={`absolute top-2 right-2 z-30 flex gap-2
          opacity-0 group-hover:opacity-100 transition
          ${loading && reqtyp === "delete" && deletingId === category._id ? "opacity-100" : ""}
        `}
      >
        {/* edit */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(category);
          }}
          disabled={loading}
          className="p-2 rounded-full backdrop-blur-md border
            bg-black/70 border-yellow-400/40 text-yellow-400
            hover:bg-yellow-500 hover:text-black
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pencil size={14} />
        </button>

        {/* delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category._id);
          }}
          disabled={isDeleting}
          className="p-2 rounded-full backdrop-blur-md border transition
            bg-black/70 border-red-400/40 text-red-400
            hover:bg-red-500 hover:text-white
            disabled:bg-black/40 disabled:border-gray-600
            disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {loading && reqtyp === "delete" && deletingId === category._id ? <Spinner size={14} /> : <Trash2 size={14} />}
        </button>
      </div>

      {/* name */}
      <p className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 text-sm font-semibold text-white">
        {category.name}
      </p>
    </div>
  );
};

export default CategoryTabs;
