export function BudgetSummarySkeleton() {
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between animate-pulse">
      <div>
        <div className="h-2.5 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-28 bg-gray-300 rounded" />
      </div>
      <div className="text-right">
        <div className="h-2.5 w-16 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-24 bg-red-200 rounded" />
      </div>
      <div className="text-right">
        <div className="h-2.5 w-16 bg-gray-200 rounded mb-2" />
        <div className="h-6 w-24 bg-green-200 rounded" />
      </div>
      <div className="w-32">
        <div className="h-2.5 w-8 bg-gray-200 rounded mx-auto mb-2" />
        <div className="w-full bg-gray-200 rounded-full h-2.5" />
      </div>
    </div>
  );
}
