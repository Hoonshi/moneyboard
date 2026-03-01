export function MonthlySummarySectionSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
      <div className="h-3 w-16 bg-gray-200 rounded mb-3" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="h-2 w-6 bg-gray-100 rounded mb-1" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
        ))}
        <div className="pt-2 border-t border-gray-100">
          <div className="h-2 w-6 bg-gray-100 rounded mb-1" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
