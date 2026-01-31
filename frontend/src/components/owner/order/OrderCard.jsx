import OrderStatusBadge from './OrderStatusBadge'
import { Eye, Printer } from "lucide-react";
import { motion } from "framer-motion";


export default function OrderCard({ order, onClick , setSelectedOrder }) {
const statusBorder = {
Pending: 'border-yellow-400/40',
Preparing: 'border-blue-400/40',
Served: 'border-green-400/40',
Delayed: 'border-red-500/40 ',
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
className={` rounded-xl p-4 border bg-neutral-950  border-neutral-800 hover:border-yellow-400/40
hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.4)] transition-all duration-300 ${glow}`}
>
<div className="flex justify-between items-center">
<div>
<p className="text-white font-semibold text-lg">{order._id}</p>
<p className="text-sm text-gray-400">
{order.orderType} • {order.createdAt}
</p>
</div>


<span
className={`px-3 py-1 text-xs rounded-full border cursor-pointer ${
order.status === "Completed"
? "border-green-500/40 text-green-400 hover:bg-green-500/10"
: order.status === "Preparing"
? "border-yellow-500/40  text-yellow-300 hover:bg-green-500/10"
: "border-red-500/40  text-red-300 hover:bg-red-500/10"
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