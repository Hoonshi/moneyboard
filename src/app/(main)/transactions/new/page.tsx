import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { TransactionForm } from "./_components/transactionForm";

export default function TransactionNewPage() {
  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-1">
          <Link href="/transactions">
            <ChevronLeft size={18} className="text-gray-400 -ml-1" />
          </Link>
          <div>
            <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
              새 거래
            </h1>
            <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
              거래 정보를 입력하세요
            </p>
          </div>
        </div>
        <button
          type="submit"
          form="transaction-form"
          className="cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white lg:rounded-md lg:px-3 lg:py-1.5 lg:text-xs"
        >
          저장
        </button>
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="max-w-lg mx-auto">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
}
