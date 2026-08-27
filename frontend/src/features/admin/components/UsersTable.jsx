import React, { useState } from "react";
import { Search, UserCheck, Phone, Store, Calendar } from "lucide-react";

const UsersTable = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (users || []).filter((u) => {
    const term = searchTerm.toLowerCase();
    return (
      u.name?.toLowerCase().includes(term) ||
      u.phone?.toLowerCase().includes(term) ||
      u.restaurant?.restaurantName?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header & Search */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Platform Users & Diners
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Total {users?.length || 0} customer accounts across restaurants
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or restaurant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/70 dark:bg-gray-700/30 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
              <th className="py-3.5 px-5">Customer Name</th>
              <th className="py-3.5 px-5">Phone Number</th>
              <th className="py-3.5 px-5">Dining Restaurant</th>
              <th className="py-3.5 px-5">Role</th>
              <th className="py-3.5 px-5 text-right">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No customers or diners found matching your query.
                </td>
              </tr>
            ) : (
              filtered.map((u) => (
                <tr
                  key={u._id}
                  className="hover:bg-gray-50/60 dark:hover:bg-gray-700/40 transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2.5 font-bold text-gray-900 dark:text-white">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-xs">
                        {u.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span>{u.name || "Guest Customer"}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-mono text-xs">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{u.phone}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                      <Store className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-semibold">
                        {u.restaurant?.restaurantName || "Dinery"}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                      <UserCheck className="w-3 h-3" />
                      {u.role || "user"}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-end gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
