export function DashboardChartSkeleton() {
  return (
    <div className="grid lg:grid-cols-5 gap-3 grid-cols-1 animate-pulse">
      {/* 파이 차트 */}
      <div className="col-span-3 border border-gray-200 rounded-lg p-3">
        <div className="h-2.5 w-24 bg-gray-200 rounded mb-3" />
        <div className="flex items-center justify-center h-[250px]">
          <div className="w-40 h-40 rounded-full bg-gray-100 border-[30px] border-gray-200" />
        </div>
      </div>
      {/* 카테고리 바 */}
      <div className="col-span-2 border border-gray-200 rounded-lg p-3">
        <div className="h-2.5 w-24 bg-gray-200 rounded mb-4" />
        <div className="space-y-3 mt-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2.5 w-14 bg-gray-200 rounded" />
              <div className="flex-1 bg-gray-100 rounded-full h-2" />
              <div className="h-2.5 w-7 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
