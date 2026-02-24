import { Search } from 'lucide-react';

const ROWS = [
  { date: '02.20', name: '스타벅스 강남점', cat: '식비', memo: '아메리카노', amount: '-₩6,500',     balance: '₩1,353,000', neg: true  },
  { date: '02.20', name: '점심 김밥천국',   cat: '식비', memo: '점심 식사', amount: '-₩8,000',     balance: '₩1,359,500', neg: true  },
  { date: '02.19', name: '카카오택시',      cat: '교통', memo: '—',         amount: '-₩12,000',    balance: '₩1,367,500', neg: true  },
  { date: '02.19', name: '넷플릭스',        cat: '구독', memo: '월 구독료', amount: '-₩17,000',    balance: '₩1,379,500', neg: true  },
  { date: '02.18', name: '쿠팡',            cat: '쇼핑', memo: '생필품',   amount: '-₩32,000',    balance: '₩1,396,500', neg: true  },
  { date: '02.15', name: '월급',            cat: '급여', memo: '2월 급여', amount: '+₩3,200,000', balance: '₩1,428,500', neg: false },
];

export function TransactionsDesktop() {
  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
          {['전체', '수입', '지출'].map((tab, i) => (
            <span
              key={tab}
              className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer ${
                i === 0 ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 w-40">
          <Search size={12} className="text-gray-400" />
          <span className="text-xs text-gray-400">거래 검색...</span>
        </div>
        {['카테고리 ▾', '기간 ▾', '정렬 ▾'].map((btn) => (
          <span key={btn} className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200">
            {btn}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-medium">
          <span className="col-span-1">날짜</span>
          <span className="col-span-3">내용</span>
          <span className="col-span-2">카테고리</span>
          <span className="col-span-2">메모</span>
          <span className="col-span-2 text-right">금액</span>
          <span className="col-span-2 text-right">잔액</span>
        </div>
        {ROWS.map((tx, i) => (
          <div
            key={i}
            className="grid grid-cols-12 gap-2 px-3 py-2.5 border-b border-gray-100 last:border-0 text-xs items-center hover:bg-blue-50 cursor-pointer"
          >
            <span className="col-span-1 text-gray-400">{tx.date}</span>
            <span className="col-span-3 font-medium text-gray-700">{tx.name}</span>
            <span className="col-span-2 text-gray-500">{tx.cat}</span>
            <span className="col-span-2 text-gray-400 truncate">{tx.memo}</span>
            <span className={`col-span-2 text-right font-semibold ${tx.neg ? 'text-red-500' : 'text-blue-600'}`}>
              {tx.amount}
            </span>
            <span className="col-span-2 text-right text-gray-400">{tx.balance}</span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 pt-1">
        {['←', '1', '2', '3', '...', '12', '→'].map((p, i) => (
          <div
            key={i}
            className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer ${
              p === '1' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}