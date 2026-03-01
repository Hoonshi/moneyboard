export function DailyTrendChartSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm animate-pulse">
      <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
      <div className="h-24 flex items-end gap-0.5 px-1">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-red-100 rounded-t"
            style={{ height: `${15 + (i % 5) * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}
