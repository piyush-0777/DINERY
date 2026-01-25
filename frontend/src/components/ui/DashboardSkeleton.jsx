import Skeleton from "./Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 bg-black min-h-screen">
      
      {/* Header */}
      <Skeleton className="h-8 w-56 bg-white/10" />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            className="h-28 rounded-xl bg-white/10"
          />
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton
            key={i}
            className="h-10 rounded-md bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}
