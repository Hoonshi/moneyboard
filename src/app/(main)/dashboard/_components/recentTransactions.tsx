import { Utensils, Car, Gamepad2, Wallet } from 'lucide-react';
import type { ElementType } from 'react';

const recentTx: { Icon: ElementType; name: string; cat: string; amount: string; neg: boolean; time: string }[] = [
  { Icon: Utensils, name: '스타벅스',  cat: '식비', amount: '-₩6,500',     neg: true,  time: '오늘'   },
  { Icon: Wallet,   name: '월급',      cat: '급여', amount: '+₩3,200,000', neg: false, time: '어제'   },
  { Icon: Car,      name: '택시',      cat: '교통', amount: '-₩12,000',    neg: true,  time: '어제'   },
  { Icon: Gamepad2, name: '넷플릭스',  cat: '구독', amount: '-₩17,000',    neg: true,  time: '2일 전' },
];

export function RecentTransactions() {
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-gray-800">최근 거래</p>
        <span className="text-[10px] text-blue-500">전체보기 →</span>
      </div>
      <div className="space-y-1">
        {recentTx.map((tx, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.neg ? 'bg-gray-50' : 'bg-blue-50'}`}>
              <tx.Icon size={16} className={tx.neg ? 'text-gray-500' : 'text-blue-500'} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800">{tx.name}</p>
              <p className="text-[10px] text-gray-400">{tx.cat} · {tx.time}</p>
            </div>
            <span className={`text-xs font-semibold ${tx.neg ? 'text-red-500' : 'text-blue-600'}`}>
              {tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
