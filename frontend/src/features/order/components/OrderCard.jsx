import {useEffect} from 'react'
import OrderStatusBadge from './OrderStatusBadge'
import { Eye, Printer } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector  } from 'react-redux';
import { toast } from "react-toastify";
import { useUpdateOrderStatus } from '../hooks/useUpdateOrderStatus';



export default function OrderCard({ order, onClick , setSelectedOrder , setUpdateStatus , updateStatus }) {
    const updateOrderStatus = useUpdateOrderStatus()
const statusBorder = { 
pending: 'border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10',
preparing: 'border-blue-500/40 text-blue-400 hover:bg-blue-500/10',
served: 'border-orange-500/40 text-orange-400 hover:bg-orange-500/10' ,
completed: 'border-green-500/40 text-green-400 hover:bg-green-500/10',
delayed: 'border-red-500/40 text-red-400 hover:bg-red-500/10',
}


const nextStatus = async (id) => {
    let status;
    if (order.status === "pending") {
       status = 'preparing' 
    } else if (order.status === "preparing") {
        status = 'served'
    } else if (order.status === "served") {
        status = 'completed'
    } 
    setUpdateStatus(id);

     try{
        const result = await updateOrderStatus.updateOrderStatus({id , status})
     } catch (error) {
        if(error?.message) {
        toast.error(error.message)
        } else {
            toast.error('update status is fald')
        }
     }
}



return (
<motion.div
key={order._id}
whileHover={{ scale: 1.02 }}
className={` rounded-xl p-4 border bg-neutral-950  border-neutral-800 hover:border-yellow-400/40
hover:shadow-[0_0_30px_-10px_rgba(234,179,8,0.4)] transition-all duration-300 `}
>
<div className="flex justify-between items-center">
<div>
<p className="text-white font-semibold text-lg">#{order._id}</p>
<p className="text-sm text-gray-400">
table id: {order?.table !== null ?order.table.tableId : '00'} • {new Date(order.createdAt).toLocaleString()}
</p>
</div>


<span
className={`px-3 py-1 text-xs rounded-full border cursor-pointer ${
statusBorder[order.status]
}`}
>
{updateOrderStatus.loading === true && order._id === updateStatus ? 'processing...' :  order.status}
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


{order.status !== "completed" && (
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