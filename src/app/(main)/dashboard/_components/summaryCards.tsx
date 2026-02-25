export function SummaryCards() {
  return (
    <div className="bg-main rounded-2xl p-4 text-white">
      <p className="text-xs text-blue-100">이번 달 잔액</p>
      <p className="text-2xl font-bold mt-1">₩1,353,000</p>
      <div className="flex gap-4 mt-3">
        <div>
          <p className="text-[10px] text-blue-200">수입</p>
          <p className="text-sm font-semibold">₩3,200,000</p>
        </div>
        <div>
          <p className="text-[10px] text-blue-200">지출</p>
          <p className="text-sm font-semibold">₩1,847,000</p>
        </div>
      </div>
    </div>
  );
}
