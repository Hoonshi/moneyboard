import { TransactionDetail } from "./_components/transactionDetail";
import DetailUpdateDeleteButton from "./_components/detailUpdateDeleteButton";

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-1">
          <div>
            <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
              거래 상세
            </h1>
            <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
              거래 내역 상세 정보
            </p>
          </div>
        </div>
        <DetailUpdateDeleteButton id={id} />
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="max-w-lg mx-auto">
          <TransactionDetail id={id} />
        </div>
      </div>
    </div>
  );
}
