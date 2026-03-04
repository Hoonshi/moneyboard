import { TransactionContent } from "./_components/transactionContent";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { transactionKeys } from "@/lib/queryKey";
import transactionList from "@/apis/transaction/transactionList";
import { DEFAULT_DASHBOARD_PARAMS } from "@/constants/transactionList";
import { Suspense } from "react";
import { TransactionContentSkeleton } from "@/components/skeleton/transactionContentSkeleton";
import NewTransactionButton from "@/components/ui/newTransactionButton";
import { createClient as createServerClient } from "@/lib/supabase/server";

export default async function TransactionsPage() {
  const queryClient = getQueryClient();
  const supabase = await createServerClient();

  await queryClient.prefetchQuery({
    queryKey: transactionKeys.list(DEFAULT_DASHBOARD_PARAMS),
    queryFn: () => transactionList(DEFAULT_DASHBOARD_PARAMS, supabase),
  });

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div>
          <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
            거래 내역
          </h1>
          <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
            전체 수입/지출 내역
          </p>
        </div>

        <NewTransactionButton className="px-3 py-1.5" />
      </header>

      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<TransactionContentSkeleton />}>
            <TransactionContent />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
