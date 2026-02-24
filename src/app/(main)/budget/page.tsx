import { Plus, Utensils, Home, Car, Gamepad2, Package, Pill } from 'lucide-react';
import { MobileShell } from '@/components/layout/mobile-shell';
import { BudgetOverview } from './_components/budget-overview';
import { BudgetCard } from './_components/budget-card';
import { BudgetDesktop } from './_components/budget-desktop';

const BUDGETS = [
  { Icon: Utensils, cat: '식비',       used: 420000, total: 500000, color: 'bg-orange-400' },
  { Icon: Home,     cat: '주거/공과금', used: 450000, total: 500000, color: 'bg-blue-400'   },
  { Icon: Car,      cat: '교통',       used: 85000,  total: 100000, color: 'bg-green-400'  },
  { Icon: Gamepad2, cat: '여가/문화',  used: 180000, total: 200000, color: 'bg-purple-400' },
  { Icon: Package,  cat: '쇼핑',       used: 95000,  total: 300000, color: 'bg-pink-400'   },
  { Icon: Pill,     cat: '의료/건강',  used: 0,      total: 100000, color: 'bg-teal-400'   },
];

export default function BudgetPage() {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell
          title="예산 관리"
          subtitle="2025년 2월"
          rightAction={
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500 text-white">
              <Plus size={12} strokeWidth={2.5} /> 추가
            </div>
          }
        >
          <div className="space-y-4 pt-2">
            <BudgetOverview />
            <div className="space-y-2.5">
              {BUDGETS.map((b) => (
                <BudgetCard key={b.cat} {...b} />
              ))}
            </div>
          </div>
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">예산 관리</h2>
            <p className="text-xs text-gray-400 mt-0.5">2025년 2월 카테고리별 예산</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-white bg-blue-500 rounded-md px-3 py-1.5 hover:bg-blue-600">
            <Plus size={13} strokeWidth={2.5} /> 예산 추가
          </button>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <BudgetDesktop />
        </div>
      </div>
    </div>
  );
}
