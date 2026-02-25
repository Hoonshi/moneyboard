// Deterministic heights to avoid hydration mismatch
const HEIGHTS = [45, 78, 23, 61, 89, 34, 56, 12, 90, 67, 43, 71, 28, 85, 52, 38, 76, 19, 64, 47];

export function DailyTrendChart() {
  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-xs font-bold text-gray-800 mb-3">일별 지출 추이</p>
      <div className="h-24 flex items-end gap-0.5 px-1">
        {HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-red-200 rounded-t-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1.5 px-1">
        <span className="text-[9px] text-gray-400">2/1</span>
        <span className="text-[9px] text-gray-400">2/10</span>
        <span className="text-[9px] text-gray-400">2/20</span>
      </div>
    </div>
  );
}
