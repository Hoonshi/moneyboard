export function MonthlyTrendChartSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white animate-pulse">
      <div className="h-2.5 w-16 bg-gray-200 rounded mb-3" />
      <div className="h-56 flex items-end gap-2 px-6 pb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-1 flex gap-1 items-end">
            <div
              className="flex-1 bg-blue-100 rounded-t"
              style={{ height: `${40 + (i % 3) * 30}%` }}
            />
            <div
              className="flex-1 bg-red-100 rounded-t"
              style={{ height: `${30 + (i % 4) * 20}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
