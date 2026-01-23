const MenuItemCard = ({ item, onToggleAvailability, onDelete }) => (
   <div className="group bg-neutral-950 border border-neutral-800 rounded-2xl p-4 flex gap-4 max-w-3xl w-full transition-all duration-300 hover:border-yellow-400/40 hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.4)]">
        <img
            src={item.foodImg}
            alt={item.name}
            className="w-24 h-24 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
        />


         <div className="flex-[1.2]">
            <div className="flex justify-between items-start h-full gap-1 ">
                <div className="flex flex-col items-start justify-between h-full">
                    <h3 className="text-white font-semibold text-lg">
                        {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                        {item.description}
                    </p>
                     <p className="text-yellow-400 font-semibold text-lg">₹{item.price}</p>
                </div>

                <div className="flex flex-col items-center justify-between h-full">
                <button
                    onClick={onDelete}
                    className="text-xs text-red-400 hover:text-red-500"
                >
                    Delete
                </button>
                <button
                    onClick={onToggleAvailability}
                    className={`ml-auto px-4 py-1.5 text-xs rounded-full border transition ${item.isAvailable
                            ? "border-green-500/40 text-green-400 hover:bg-green-500/10"
                            : "border-gray-500/40 text-gray-400 hover:bg-gray-500/10"
                        }`}
                >
                    {item.isAvailable ? "Available" : "Out of Stock"}
                </button>
                </div>
            </div>


            <div className="flex items-center gap-4 mt-4">
               


                
            </div>
        </div>
    </div>
);

export default MenuItemCard;