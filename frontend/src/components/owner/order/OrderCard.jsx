import OrderStatusBadge from './OrderStatusBadge'
import { Eye, Printer } from "lucide-react";
import { motion } from "framer-motion";


export default function OrderCard({ order, onClick }) {
const statusBorder = {
Pending: 'border-yellow-400',
Preparing: 'border-blue-400',
Served: 'border-green-400',
Delayed: 'border-red-500 animate-pulse',
}

const isDelayed =
Date.now() - order.createdAt > 90000 * 60000 &&
order.status !== "Completed";


const glow = order.isNew
? "shadow-[0_0_25px_rgba(250,204,21,0.6)]"
: isDelayed
? "shadow-[0_0_25px_rgba(239,68,68,0.6)]"
: "";


return (
<motion.div
key={order._id}
whileHover={{ scale: 1.02 }}
className={`bg-neutral-900 rounded-xl p-4 border border-gray-800 hover:border-yellow-400 transition-all duration-300 ${glow}`}
>
<div className="flex justify-between items-center">
<div>
<p className="font-semibold">{order._id}</p>
<p className="text-sm text-gray-400">
{order.orderType} • {order.createdAt}
</p>
</div>


<span
className={`px-3 py-1 text-xs rounded-full ${
order.status === "Completed"
? "bg-green-900 text-green-400"
: order.status === "Preparing"
? "bg-yellow-900 text-yellow-300"
: "bg-red-900 text-red-400"
}`}
>
{order.status}
</span>
</div>


<div className="flex justify-between items-center mt-4">
<p className="text-yellow-400 font-bold">₹{order.totalAmount}</p>


<div className="flex gap-2">
<button
onClick={() => setSelectedOrder(order)}
className="p-2 rounded-lg bg-gray-800 hover:bg-yellow-400 hover:text-black transition"
>
<Eye size={16} />
</button>


<button className="p-2 rounded-lg bg-gray-800 hover:bg-yellow-400 hover:text-black transition">
<Printer size={16} />
</button>


{order.status !== "Completed" && (
<button
onClick={() => nextStatus(order._id)}
className="px-3 py-1 text-xs rounded-lg bg-yellow-400 text-black hover:opacity-80 transition"
>
Next
</button>
)}
</div>
</div>
</motion.div>
)
}