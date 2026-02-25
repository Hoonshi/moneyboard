export function MonthlyComparison() {
  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-xs font-bold text-gray-800 mb-3">전월 대비</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-blue-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-500">수입</p>
          <p className="text-xs font-bold text-blue-600 mt-0.5">+₩20만</p>
          <p className="text-[10px] text-green-500">▲ 6.7%</p>
        </div>
        <div className="bg-red-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-500">지출</p>
          <p className="text-xs font-bold text-red-500 mt-0.5">+₩14.7만</p>
          <p className="text-[10px] text-red-400">▲ 8.6%</p>
        </div>
        <div className="bg-green-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-500">저축률</p>
          <p className="text-xs font-bold text-green-600 mt-0.5">42.3%</p>
          <p className="text-[10px] text-red-400">▼ 1.2%p</p>
        </div>
      </div>
    </div>
  );
}
