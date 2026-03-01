export function BudgetListSkeleton() {
  return (
    <div className="space-y-2.5 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gray-100 rounded-full" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-8 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2" />
        </div>
      ))}
    </div>
  );
}
