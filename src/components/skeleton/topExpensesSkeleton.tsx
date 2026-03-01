export function TopExpensesSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white animate-pulse">
      <div className="bg-white rounded-xl p-4">
        <div className="h-3 w-28 bg-gray-200 rounded mb-3" />
        <div className="space-y-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
            >
              <div className="h-3 w-4 bg-gray-200 rounded" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-3/4 bg-gray-200 rounded" />
                <div className="h-2 w-1/3 bg-gray-100 rounded" />
              </div>
              <div className="h-2.5 w-14 bg-red-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
