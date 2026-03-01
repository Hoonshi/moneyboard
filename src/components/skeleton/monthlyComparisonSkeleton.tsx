export function MonthlyComparisonSkeleton() {
  return (
    <div className="bg-white rounded-xl p-4 animate-pulse">
      <div className="h-3 w-16 bg-gray-200 rounded mb-3" />
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-blue-50 rounded-lg p-2.5">
          <div className="h-2 w-8 bg-blue-100 rounded mx-auto mb-1.5" />
          <div className="h-3 w-16 bg-blue-200 rounded mx-auto mb-1.5" />
          <div className="h-2 w-10 bg-blue-100 rounded mx-auto" />
        </div>
        <div className="bg-red-50 rounded-lg p-2.5">
          <div className="h-2 w-8 bg-red-100 rounded mx-auto mb-1.5" />
          <div className="h-3 w-16 bg-red-200 rounded mx-auto mb-1.5" />
          <div className="h-2 w-10 bg-red-100 rounded mx-auto" />
        </div>
        <div className="bg-green-50 rounded-lg p-2.5">
          <div className="h-2 w-10 bg-green-100 rounded mx-auto mb-1.5" />
          <div className="h-3 w-10 bg-green-200 rounded mx-auto mb-1.5" />
          <div className="h-2 w-10 bg-green-100 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}
