import { Pencil, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import Spinner from "../../ui/Spiner";

const MenuItemCard = ({
  item,
  onToggleAvailability,
  onEdit,
  onDelete,
  deletingId
}) => {

  const { loading, reqtype } = useSelector(state => state.loadfoodstatus);

  const isDeleting =
    loading &&
    reqtype === "deletfood" &&
    deletingId === item._id;

  const isEditing =
    loading &&
    reqtype === "editfood" &&
    deletingId === item._id;

  return (
    <div
      className="group relative bg-neutral-950 border border-neutral-800 rounded-2xl p-4 w-full
        flex transition-all duration-300 hover:border-yellow-400/40
        hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.4)]"
    >
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 relative">
        <img
          src={item.foodImg}
          alt={item.name}
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="w-full h-full rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between ml-4 relative">
        {/* Actions */}
        <div
          className={`absolute top-0 right-0 flex gap-2 z-20
            opacity-0 group-hover:opacity-100 transition
            ${isDeleting || isEditing ? "opacity-100" : ""}
          `}
        >
          {/* Edit */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item);
            }}
            disabled={loading}
            className="p-2 rounded-full backdrop-blur-md border
              bg-black/70 border-yellow-400/40 text-yellow-400
              hover:bg-yellow-500 hover:text-black
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? <Spinner size={14} /> : <Pencil size={14} />}
          </button>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item._id);
            }}
            disabled={isDeleting}
            className="p-2 rounded-full backdrop-blur-md border
              bg-black/70 border-red-400/40 text-red-400
              hover:bg-red-500 hover:text-white
              disabled:bg-black/40 disabled:border-gray-600
              disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isDeleting ? <Spinner size={14} /> : <Trash2 size={14} />}
          </button>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-lg">{item.name}</h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Price & Availability */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-yellow-400 font-semibold text-lg">
            ₹{item.price}
          </p>

          <button
            onClick={onToggleAvailability}
            className={`px-4 py-1.5 text-xs rounded-full border transition
              ${item.isAvailable
                ? "border-green-500/40 text-green-400 hover:bg-green-500/10"
                : "border-gray-500/40 text-gray-400 hover:bg-gray-500/10"
              }`}
          >
            {item.isAvailable ? "Available" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
