// 이 컴포넌트는 useTransaction에 id를 넣어 데이터를 가져와 form에 넣는 단순히 거쳐가는 용도

"use client";

import { useTransaction } from "@/hooks/query/useTransaction";
import { TransactionForm } from "@/app/(main)/transactions/new/_components/transactionForm";

export default function TransactionEditLoader({ id }: { id: string }) {
  const { data, isPending } = useTransaction(id);

  if (isPending || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-main rounded-xl flex items-center justify-center text-white font-bold text-lg animate-pulse">
            ₩
          </div>
          <p className="text-xs text-gray-400">불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <TransactionForm
      transactionId={id}
      initialValues={{
        type: data.type,
        amount: data.amount,
        title: data.title,
        date: data.date,
        memo: data.memo,
        category_id: data.category_id,
      }}
    />
  );
}
