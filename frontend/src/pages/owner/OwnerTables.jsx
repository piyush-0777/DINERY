import { useSelector } from "react-redux";
import TableCard from "../../components/owner/table/TableCard";


export default function TablesPage() {
  const { tables, loading, error } = useSelector(
    (state) => state.tables
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-gray-400">
        Loading tables...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      {/* Page Title */}
      <h1 className="mb-6 text-2xl font-bold text-white">
        🍽️ Table Management
      </h1>

      {/* Tables Grid */}
      {tables.length === 0 ? (
        <div className="mt-20 text-center text-gray-500">
          No tables found
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      )}
    </div>
  );
}
