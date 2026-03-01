export function CategorySectionSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg p-3 animate-pulse">
      <div className="h-2.5 w-20 bg-gray-200 rounded mb-3" />
      <div className="mt-2 space-y-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 py-1 px-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 h-2.5 bg-gray-200 rounded" />
            <div className="w-6 h-6 bg-gray-100 rounded" />
            <div className="w-6 h-6 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}
