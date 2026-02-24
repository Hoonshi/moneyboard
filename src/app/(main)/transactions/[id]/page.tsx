import { MobileShell } from '@/components/layout/mobile-shell';
import { TransactionDetail } from './_components/transaction-detail';

export default function TransactionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell
          title="거래 상세"
          hideNav
          back
          rightAction={
            <div className="flex gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">수정</span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">삭제</span>
            </div>
          }
        >
          <TransactionDetail id={params.id} />
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">거래 상세</h2>
            <p className="text-xs text-gray-400 mt-0.5">거래 내역 상세 정보</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-xs text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50">
              수정
            </button>
            <button className="text-xs text-red-500 border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-50">
              삭제
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <div className="max-w-lg mx-auto">
            <TransactionDetail id={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
