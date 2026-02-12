import React, { useState, useEffect } from 'react'
import { StatCard } from "../../components/owner/StatCard";
import { StatusCard } from "../../components/owner/StatusCard";
import { OrdersTrend } from "../../components/owner/OrdersTrend";
import Loader from '../../components/ui/Loader';
import { getSocket  } from '../../consfig/socket'
import {useSelector} from 'react-redux'

const OwnerDashboard = () => {


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 30000); // simulate loading
  }, []);
  const {socketId} = useSelector(state => state.socketId)
   console.log('id dashbord' , socketId)
  

  const recentOrders = [
    { id: '#1021', table: 'Table 4', amount: '₹420', status: 'Preparing' },
    { id: '#1020', table: 'Table 1', amount: '₹860', status: 'Completed' },
    { id: '#1019', table: 'Online', amount: '₹310', status: 'Completed' },
    { id: '#1018', table: 'Table 6', amount: '₹150', status: 'Cancelled' },
    { id: '#1017', table: 'Table 2', amount: '₹540', status: 'Completed' },
    { id: '#1016', table: 'Online', amount: '₹760', status: 'Preparing' },
    { id: '#1015', table: 'Table 8', amount: '₹290', status: 'Completed' },
  ];
  return (
    <div className="p-6 bg-black min-h-screen overflow-y-auto scrollbar-hide ">
      {/* <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1> */}

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders (Today)" value="128" icon="🧾" />
        <StatCard title="Total Revenue (Today)" value="₹24,500" icon="💰" />
        <StatCard title="Avg Order Value" value="₹191" icon="📈" />
        <StatCard title="Active Orders" value="12" icon="⏱" />
      </div>


      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 ">
          <OrdersTrend />
        </div>


        <div className="space-y-4">
          <StatusCard label="Preparing" count="8" color="border-yellow-500" />
          <StatusCard label="Completed" count="110" color="border-green-500" />
          <StatusCard label="Cancelled" count="10" color="border-red-500" />
        </div>
      </div>


      {/* Recent Orders */}
      <div className="mt-10 bg-neutral-900 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Last 7 Orders</h3>
        <div className="space-y-3">
          {recentOrders && recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 transition"
            >
              <div>
                <p className="text-white font-medium">{order.id}</p>
                <p className="text-sm text-gray-400">{order.table}</p>
              </div>
              <div className="text-right">
                <p className="text-white">{order.amount}</p>
                <span className={`text-xs font-semibold ${order.status === 'Completed'
                  ? 'text-green-400'
                  : order.status === 'Preparing'
                    ? 'text-yellow-400'
                    : 'text-red-400'
                  }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OwnerDashboard
