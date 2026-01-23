const CategoryTabs = ({ categories, active, onChange }) => (
    <div className="flex gap-6 border-b border-neutral-800 mb-6">
        {categories.map((cat) => (
            <button
                key={cat._id}
                onClick={() => onChange(cat)}
                className={`relative pb-3 text-sm font-medium tracking-wide transition-all duration-300 ${active._id === cat._id
                        ? "text-yellow-400"
                        : "text-gray-400 hover:text-white"
                    }`}
            >
                {cat.name}
                {active._id === cat._id && (
                    <span className="absolute left-0 -bottom-[1px] h-[2px] w-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full" />
                )}
            </button>
        ))}
        
    </div>
);

export default CategoryTabs;