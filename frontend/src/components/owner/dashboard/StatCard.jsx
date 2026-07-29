export const StatCard = ({ title, value, icon }) => {
return (
<div className="bg-neutral-900 rounded-2xl p-5 shadow-md hover:shadow-yellow-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
<div className="flex items-center justify-between">
<div>
<p className="text-sm text-gray-400">{title}</p>
<h3 className="text-2xl font-semibold text-white mt-1">{value}</h3>
</div>
<div className="text-3xl">{icon}</div>
</div>
</div>
);
};