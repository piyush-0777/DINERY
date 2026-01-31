import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersThunk } from '../../redux/thunks/ordersThunk'
import OrderCard from '../../components/owner/order/OrderCard'
import OrderFilters from '../../components/owner/order/OrderFilters'


export default function OwnerOrder() {
const dispatch = useDispatch()
const { list, loading, error } = useSelector(s => s.orders)
console.log({ list, loading, error })
const [filter, setFilter] = useState('Today')


// useEffect(() => {
// dispatch(fetchOrdersThunk())
// }, [])


if (loading) return <p className="text-yellow-400">Loading orders...</p>
if (error) return <p className="text-red-400">{error}</p>


return (
<div className="p-4 bg-black min-h-screen">
<h1 className="text-white text-2xl font-bold mb-4">Orders</h1>
<OrderFilters active={filter} setActive={setFilter} />


<div className="grid gap-4">
{list.map(order => (
<OrderCard key={order._id} order={order} />
))}
</div>
</div>
)
}