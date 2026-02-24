import { ChevronDown, Utensils, Home, Car, Gamepad2, Package } from 'lucide-react';
import type { ElementType } from 'react';
import { MobileShell } from '@/components/layout/mobile-shell';
import { MonthlyComparison } from './_components/monthly-comparison';
import { DailyTrendChart } from './_components/daily-trend-chart';
import { TopExpenses } from './_components/top-expenses';

const CATEGORY_BREAKDOWN: { Icon: ElementType; cat: string; amount: string; pct: number; color: string }[] = [
  { Icon: Utensils, cat: '식비', amount: '₩647,000', pct: 35, color: 'bg-orange-400' },
  { Icon: Home,     cat: '주거', amount: '₩517,000', pct: 28, color: 'bg-blue-400'   },
  { Icon: Car,      cat: '교통', amount: '₩277,000', pct: 15, color: 'bg-green-400'  },
  { Icon: Gamepad2, cat: '여가', amount: '₩221,000', pct: 12, color: 'bg-purple-400' },
  { Icon: Package,  cat: '기타', amount: '₩185,000', pct: 10, color: 'bg-gray-400'   },
];

export default function ReportsPage() {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell
          title="리포트"
          rightAction={
            <div className="flex items-center gap-0.5 text-xs font-bold text-gray-700">
              2025.02 <ChevronDown size={14} className="text-gray-400" />
            </div>
          }
        >
          <div className="space-y-4 pt-2">
            <MonthlyComparison />
            <DailyTrendChart />

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl p-4">
              <p className="text-xs font-bold text-gray-800 mb-3">카테고리별 지출</p>
              <div className="space-y-2.5">
                {CATEGORY_BREAKDOWN.map((item) => (
                  <div key={item.cat}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <item.Icon size={13} className="text-gray-500" />
                        <span className="text-xs text-gray-700">{item.cat}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-800">{item.amount}</span>
                        <span className="text-[10px] text-gray-400">{item.pct}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`${item.color} h-1.5 rounded-full`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <TopExpenses />
          </div>
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">리포트</h2>
            <p className="text-xs text-gray-400 mt-0.5">월간 재무 분석</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-50">
            2025년 2월 <ChevronDown size={13} className="text-gray-400" />
          </button>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <div className="space-y-4">
            {/* Summary row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: '총 수입', amount: '₩3,200,000', color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: '총 지출', amount: '₩1,847,000', color: 'text-red-500',  bg: 'bg-red-50'  },
                { label: '저축률',  amount: '42%',         color: 'text-green-600', bg: 'bg-green-50' },
              ].map((c) => (
                <div key={c.label} className={`${c.bg} rounded-lg p-3.5`}>
                  <p className="text-xs text-gray-500">{c.label}</p>
                  <p className={`text-lg font-bold mt-1 ${c.color}`}>{c.amount}</p>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">월별 추이</p>
                <div className="h-36 flex items-end gap-1.5 px-2">
                  {[65,45,70,55,80,60,75,50,85,70,60,72].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col gap-0.5">
                      <div className="bg-blue-200 rounded-sm" style={{ height: `${h}%` }} />
                      <div className="bg-red-200 rounded-sm"  style={{ height: `${h * 0.6}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">카테고리별 지출</p>
                <div className="space-y-2.5">
                  {CATEGORY_BREAKDOWN.map((item) => (
                    <div key={item.cat} className="flex items-center gap-2">
                      <item.Icon size={12} className="text-gray-400 shrink-0" />
                      <span className="text-xs w-8 text-gray-600">{item.cat}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 w-16 text-right">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top expenses */}
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">주요 지출 항목</p>
              <TopExpenses />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
