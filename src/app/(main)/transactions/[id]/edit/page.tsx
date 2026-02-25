import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import TransactionEditLoader from "./_components/transactionEditLoader";

export default async function TransactionEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-1">
          {/* <Link href={`/transactions/${id}`}>
            <ChevronLeft size={18} className="text-gray-400 -ml-1" />
          </Link> */}
          <div>
            <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
              거래 수정
            </h1>
            <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
              거래 정보를 수정하세요
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            className="cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white lg:rounded-md lg:px-3 lg:py-1.5 lg:text-xs"
            href={`/transactions/${id}`}
          >
            취소{" "}
          </Link>
          <button
            type="submit"
            form="transaction-form"
            className="cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white lg:rounded-md lg:px-3 lg:py-1.5 lg:text-xs"
          >
            저장
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="max-w-lg mx-auto">
          <TransactionEditLoader id={id} />
        </div>
      </div>
    </div>
  );
}
