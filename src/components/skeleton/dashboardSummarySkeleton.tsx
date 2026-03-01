export function DashboardSummarySkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3 animate-pulse">
      <div className="bg-blue-50 rounded-lg p-3.5">
        <div className="h-2.5 w-20 bg-blue-100 rounded mb-2" />
        <div className="h-5 w-24 bg-blue-200 rounded" />
      </div>
      <div className="bg-red-50 rounded-lg p-3.5">
        <div className="h-2.5 w-20 bg-red-100 rounded mb-2" />
        <div className="h-5 w-24 bg-red-200 rounded" />
      </div>
      <div className="bg-green-50 rounded-lg p-3.5">
        <div className="h-2.5 w-12 bg-green-100 rounded mb-2" />
        <div className="h-5 w-24 bg-green-200 rounded" />
      </div>
    </div>
  );
}
