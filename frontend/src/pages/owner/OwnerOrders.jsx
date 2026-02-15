import { useEffect, useState , useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersThunk } from '../../redux/thunks/ordersThunk'
import OrderCard from '../../components/owner/order/OrderCard'
import OrderFilters from '../../components/owner/order/OrderFilters'
import OrderDetailModal from '../../components/owner/order/OrderDetailModal'
import {cashPaymentThunk} from '../../redux/thunks/billThunk'


export default function OwnerOrder() {
const dispatch = useDispatch()
const { list, loading, error , reqtype  , success } = useSelector(s => s.orders)
const loadBill = useSelector(s => s.loadBill)

const bills = useSelector(s=> s.bills.bill)


const [filter, setFilter] = useState('Today')
const [selectedOrder , setSelectedOrder] = useState();
const [updateStatus , setUpdateStatus] = useState();

const filerOrder = useMemo(()=>{
 if(filter === "Today") {
    return list;
 } else {
    return list.filter((e)=>e.status === filter);
 }
} , [filter])
// useEffect(() => {
// dispatch(fetchOrdersThunk())
// }, [])


// if (loading) return <p className="text-yellow-400">Loading orders...</p>
// if (error) return <p className="text-red-400">{error}</p>

const cashPayment = (billId , tableId) => {
    console.log('bill' , billId , 'table' , tableId)
    dispatch(cashPaymentThunk({billId , tableId}))

}

return (
<div className="p-4 bg-black min-h-screen">
<h1 className="text-white text-2xl font-bold mb-4">Orders</h1>
<OrderFilters active={filter} setActive={setFilter} />


<div className="grid gap-4">
{filerOrder.map(order => (
<OrderCard 
key={order._id} 
order={order} 
setSelectedOrder={setSelectedOrder}
setUpdateStatus={setUpdateStatus}
updateStatus={updateStatus} />
))}
</div>
{selectedOrder && 
<OrderDetailModal  
order={selectedOrder} 
bill = {
     bills.filter((e)=> e.order === selectedOrder._id)[0]
}
onClose={()=>{setSelectedOrder(null)}}
onCashPayment={cashPayment} />}

</div>
)
}