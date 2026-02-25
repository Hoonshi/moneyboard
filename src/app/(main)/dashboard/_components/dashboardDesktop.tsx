import { Utensils, Car, Wallet, Repeat } from 'lucide-react';
import type { ElementType } from 'react';

const RECENT: { Icon: ElementType; name: string; cat: string; amount: string; neg: boolean }[] = [
  { Icon: Utensils, name: '스타벅스',  cat: '식비', amount: '-₩6,500',     neg: true  },
  { Icon: Wallet,   name: '월급',      cat: '급여', amount: '+₩3,200,000', neg: false },
  { Icon: Car,      name: '택시',      cat: '교통', amount: '-₩12,000',    neg: true  },
  { Icon: Repeat,   name: '넷플릭스',  cat: '구독', amount: '-₩17,000',    neg: true  },
];

const BUDGET_PROGRESS = [
  { cat: '식비', used: 420000, total: 500000 },
  { cat: '교통', used: 85000,  total: 100000 },
  { cat: '여가', used: 180000, total: 200000 },
  { cat: '쇼핑', used: 95000,  total: 300000 },
];

const CAT_BREAKDOWN = [
  { cat: '식비', pct: 35, color: 'bg-orange-400' },
  { cat: '주거', pct: 28, color: 'bg-blue-400'   },
  { cat: '교통', pct: 15, color: 'bg-green-400'  },
  { cat: '여가', pct: 12, color: 'bg-purple-400' },
  { cat: '기타', pct: 10, color: 'bg-gray-400'   },
];

export function DashboardDesktop() {
  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '이번 달 수입', amount: '₩3,200,000', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '이번 달 지출', amount: '₩1,847,000', color: 'text-red-500',  bg: 'bg-red-50'  },
          { label: '잔액',         amount: '₩1,353,000', color: 'text-green-600', bg: 'bg-green-50' },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} rounded-lg p-3.5`}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-lg font-bold mt-1 ${c.color}`}>{c.amount}</p>
            <p className="text-xs text-gray-400 mt-1">전월 대비 +12%</p>
          </div>
        ))}
      </div>

      {/* Chart + Category */}
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 border border-gray-200 rounded-lg p-3">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">월별 수입/지출 추이</span>
          <div className="mt-3 h-36 flex items-end gap-1.5 px-2">
            {[65,45,70,55,80,60,75,50,85,70,60,72].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col gap-0.5">
                <div className="bg-blue-200 rounded-sm" style={{ height: `${h}%` }} />
                <div className="bg-red-200 rounded-sm"  style={{ height: `${h * 0.6}%` }} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 border border-gray-200 rounded-lg p-3">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">카테고리별 지출</span>
          <div className="mt-3 space-y-2">
            {CAT_BREAKDOWN.map((item) => (
              <div key={item.cat} className="flex items-center gap-2">
                <span className="text-xs w-10 text-gray-600">{item.cat}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.pct}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-7">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">예산 진행률</span>
        <div className="mt-2 grid grid-cols-4 gap-3">
          {BUDGET_PROGRESS.map((b) => {
            const pct = Math.round((b.used / b.total) * 100);
            return (
              <div key={b.cat} className="text-center">
                <p className="text-xs text-gray-500">{b.cat}</p>
                <div className="relative w-12 h-12 mx-auto mt-1">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle
                      cx="18" cy="18" r="14" fill="none"
                      stroke={pct > 80 ? '#ef4444' : '#3b82f6'}
                      strokeWidth="3"
                      strokeDasharray={`${(pct / 100) * 88} 88`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">{pct}%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{(b.used/10000).toFixed(0)}만/{(b.total/10000).toFixed(0)}만</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">최근 거래</span>
        <div className="mt-2 space-y-1">
          {RECENT.map((tx, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-gray-50 cursor-pointer">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${tx.neg ? 'bg-gray-100' : 'bg-blue-50'}`}>
                <tx.Icon size={13} className={tx.neg ? 'text-gray-500' : 'text-blue-500'} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700">{tx.name}</p>
                <p className="text-xs text-gray-400">{tx.cat}</p>
              </div>
              <span className={`text-xs font-semibold ${tx.neg ? 'text-red-500' : 'text-blue-600'}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}