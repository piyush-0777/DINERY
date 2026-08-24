export default function OrderStatusBadge({ status }) {
const colors = {
pending: 'bg-yellow-500/20 text-yellow-400',
preparing: 'bg-blue-500/20 text-blue-400',
served: 'bg-green-500/20 text-green-400',
delayed: 'bg-red-500/20 text-red-400',
}


return (
<span className={`px-3 py-1 text-xs rounded-full ${colors[status]}`}>
{status.toUpperCase()}
</span>
)
}