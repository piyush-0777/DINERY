import { Pencil, Trash2 } from "lucide-react";


const CategoryTabs = ({ category, active, onClick , onEdit, onDelete , categoryId  }) => (
     <div
    onClick={onClick}
    className={`relative min-w-[120px] h-28 shrink-0 rounded-2xl overflow-hidden cursor-pointer group transition
      ${active ? "ring-2 ring-yellow-400" : "ring-1 ring-neutral-800"}
    `}
  >
    {/* Fallback background */}
    <div className="absolute inset-0 bg-neutral-800" />

    {/* Image */}
    <img
      src={category.image}
      alt={category.name}
      onError={(e) => (e.currentTarget.style.display = "none")}
      className="relative z-10 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
    />

    {/* Overlay */}
    <div className="absolute inset-0 z-20 bg-black/40 group-hover:bg-black/20 transition" />

    {/* Hover actions */}
    <div
      className={`absolute top-2 right-2 z-30 flex gap-2
      opacity-0 group-hover:opacity-100 transition-all duration-300
      ${loading == true &&  ItemId == item._id  ?'opacity-100':''}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(category);
        }}
        className={`p-2 rounded-full backdrop-blur-md border transition
              ${loading == true && reqtype == "editfood" && ItemId == item._id
                ? "bg-black/40 border-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-black/70 border-yellow-400/40 text-yellow-400 hover:bg-yellow-500 hover:text-black"
              }`}
      >
        {loading == true && reqtype == "editfood"&& ItemId == item._id  ? <Spinner /> : <Pencil size={14} />}
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(category._id);
        }}
         className={`p-2 rounded-full backdrop-blur-md border transition
            ${loading === true && reqtype == "deletfood" && deleteCategoryId == item._id
                ? "bg-black/40 border-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-black/70 border-red-400/40 text-red-400 hover:bg-red-500 hover:text-white"
              }`}
      >
        {loading === true && reqtype == "deletfood" && deleteCategoryId == item._id ? <Spinner /> : <Trash2 size={14} />}
      </button>
    </div>

    {/* Category name */}
    <p className="absolute bottom-2 left-1/2 z-30 -translate-x-1/2 text-sm font-semibold text-white">
      {category.name}
    </p>
  </div>
);

export default CategoryTabs;