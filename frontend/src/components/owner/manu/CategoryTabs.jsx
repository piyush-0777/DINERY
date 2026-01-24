const CategoryTabs = ({ category, active, onClick }) => (
     <div
      onClick={onClick}
      className={`relative min-w-[120px] h-28 shrink-0 rounded-2xl overflow-hidden cursor-pointer group transition
        ${active ? "ring-2 ring-yellow-400" : "ring-1 ring-neutral-800"}
      `}
    >
      <img
        src={category.c_img}
        alt={category.c_name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-white">
        {category.c_name}
      </p>
    </div>
);

export default CategoryTabs;