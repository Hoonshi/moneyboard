export function TransactionContentSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {/* 필터 바 */}
      <div className="flex gap-2">
        <div className="h-8 w-24 bg-gray-200 rounded-md" />
        <div className="h-8 w-24 bg-gray-200 rounded-md" />
        <div className="flex-1 h-8 bg-gray-100 rounded-md" />
      </div>
      {/* 거래 목록 */}
      <div className="space-y-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-1.5 px-2 border border-gray-100 rounded-md"
          >
            <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-2/3 bg-gray-200 rounded" />
              <div className="h-2 w-1/3 bg-gray-100 rounded" />
            </div>
            <div className="h-2.5 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      {/* 페이지네이션 */}
      <div className="flex justify-center gap-1 pt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-7 h-7 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
}
