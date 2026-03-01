export function CalendarSectionSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex justify-center py-1">
            <div className="h-3 w-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
      {/* 날짜 셀 */}
      <div className="flex flex-col gap-1">
        {Array.from({ length: 5 }).map((_, week) => (
          <div key={week} className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, day) => (
              <div key={day} className="h-16 bg-gray-100 rounded-lg" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
