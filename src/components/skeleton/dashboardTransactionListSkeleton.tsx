export function DashboardTransactionListSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-3 animate-pulse">
      <div className="h-2.5 w-16 bg-gray-200 rounded mb-3" />
      <div className="mt-2 space-y-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-1.5 px-2">
            <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-3/4 bg-gray-200 rounded" />
              <div className="h-2 w-1/2 bg-gray-100 rounded" />
            </div>
            <div className="h-2.5 w-14 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
