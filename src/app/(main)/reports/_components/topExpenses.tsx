const TOP_EXPENSES = [
  { rank: 1, name: '월세',       amount: '₩450,000', cat: '주거' },
  { rank: 2, name: '마트 장보기', amount: '₩120,000', cat: '식비' },
  { rank: 3, name: '통신비',     amount: '₩65,000',  cat: '공과금' },
  { rank: 4, name: '병원 진료',  amount: '₩45,000',  cat: '의료' },
  { rank: 5, name: '쿠팡',       amount: '₩32,000',  cat: '쇼핑' },
];

export function TopExpenses() {
  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-xs font-bold text-gray-800 mb-3">가장 큰 지출 TOP 5</p>
      <div className="space-y-1">
        {TOP_EXPENSES.map((item) => (
          <div key={item.rank} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
            <span className="text-xs font-bold text-gray-300 w-4">{item.rank}</span>
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-700">{item.name}</p>
              <p className="text-[10px] text-gray-400">{item.cat}</p>
            </div>
            <span className="text-xs font-semibold text-red-500">{item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
