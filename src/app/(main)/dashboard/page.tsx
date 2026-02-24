import { Bell, ChevronDown } from 'lucide-react';
import { MobileShell } from '@/components/layout/mobile-shell';
import { SummaryCards } from '@/app/_components/summary-cards';
import { CategoryBreakdown } from '@/app/_components/category-breakdown';
import { BudgetProgress } from '@/app/_components/budget-progress';
import { RecentTransactions } from '@/app/_components/recent-transactions';
import { DashboardDesktop } from '@/app/_components/dashboard-desktop';

export default function DashboardPage() {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell
          title="MoneyLog"
          subtitle="2025년 2월"
          rightAction={<Bell size={20} className="text-gray-500" />}
        >
          <div className="space-y-4 pt-2">
            <SummaryCards />
            <BudgetProgress />
            <CategoryBreakdown />
            <RecentTransactions />
          </div>
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">대시보드</h2>
            <p className="text-xs text-gray-400 mt-0.5">2025년 2월 재무 현황</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-50">
            이번 달 <ChevronDown size={13} className="text-gray-400" />
          </button>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <DashboardDesktop />
        </div>
      </div>
    </div>
  );
}
