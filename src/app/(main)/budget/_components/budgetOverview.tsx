export function BudgetOverview() {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[10px] text-gray-400">총 예산</p>
          <p className="text-base font-bold text-gray-800">₩2,000,000</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-400">남은 금액</p>
          <p className="text-base font-bold text-green-600">₩770,000</p>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 mt-1">
        <div className="bg-orange-400 h-2.5 rounded-full" style={{ width: '61.5%' }} />
      </div>
      <p className="text-[10px] text-gray-400 mt-1.5 text-right">61.5% 사용</p>
    </div>
  );
}
