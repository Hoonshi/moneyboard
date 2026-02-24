import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import { MobileShell } from '@/components/layout/mobile-shell';
import { TransactionFilters } from './_components/transaction-filters';
import { TransactionList } from './_components/transaction-list';
import { TransactionsDesktop } from './_components/transactions-desktop';
import { ROUTES } from '@/constants/routes';

export default function TransactionsPage() {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell
          title="거래 내역"
          rightAction={<Search size={20} className="text-gray-500" />}
        >
          <div className="space-y-3 pt-2">
            <TransactionFilters />
            <TransactionList />
          </div>
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">거래 내역</h2>
            <p className="text-xs text-gray-400 mt-0.5">전체 수입/지출 내역</p>
          </div>
          <Link
            href={ROUTES.TRANSACTION_NEW}
            className="flex items-center gap-1 text-xs text-white bg-blue-500 rounded-md px-3 py-1.5 hover:bg-blue-600"
          >
            <Plus size={13} strokeWidth={2.5} /> 새 거래
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <TransactionsDesktop />
        </div>
      </div>
    </div>
  );
}
