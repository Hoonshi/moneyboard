import { MobileShell } from '@/components/layout/mobile-shell';
import { TransactionForm } from './_components/transaction-form';

export default function TransactionNewPage() {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell
          title="새 거래"
          hideNav
          back
          rightAction={
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-500 text-white">
              저장
            </span>
          }
        >
          <TransactionForm />
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">새 거래</h2>
            <p className="text-xs text-gray-400 mt-0.5">거래 정보를 입력하세요</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-gray-500 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50">
              취소
            </button>
            <button className="text-xs text-white bg-blue-500 rounded-md px-3 py-1.5 hover:bg-blue-600">
              저장
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <div className="max-w-lg mx-auto">
            <TransactionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
