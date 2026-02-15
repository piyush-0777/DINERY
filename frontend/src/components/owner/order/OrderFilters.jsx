export default function OrderFilters({ active, setActive }) {
const filters = ["Today",  //all order
    "pending", // order is pending
      "preparing", // order is in kitchen 
      "served" , // order is plased
      "completed", // order is completed
      "cancelled"]


return (
<div className="flex gap-3 mb-4">
{filters.map(f => (
<button
key={f}
onClick={() => setActive(f)}
className={`px-4 py-2 rounded-lg text-sm
${active === f ? 'bg-yellow-400 text-black' : 'bg-[#1a1a1a] text-gray-400'}
transition`}
>
{f}
</button>
))}
</div>
)
}