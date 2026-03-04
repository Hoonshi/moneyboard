import BudgetHeader from "./_components/budgetHeader";
import { BudgetSummary } from "./_components/budgetSummary";
import { BudgetList } from "./_components/budgetList";
import { getQueryClient } from "@/lib/get-query-client";
import { fetchBudget } from "@/apis/budget/fetchBudget";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { BudgetSummarySkeleton } from "@/components/skeleton/budgetSummarySkeleton";
import { BudgetListSkeleton } from "@/components/skeleton/budgetListSkeleton";
import { budgetKeys } from "@/lib/queryKey";
import { createClient as createServerClient } from "@/lib/supabase/server";

export default async function BudgetPage() {
  const queryClient = getQueryClient();
  const supabase = await createServerClient();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  await queryClient.prefetchQuery({
    queryKey: budgetKeys.list(year, month),
    queryFn: () => fetchBudget(year, month, supabase),
  });

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white relative">
      <BudgetHeader />
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="space-y-4">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<BudgetSummarySkeleton />}>
              <BudgetSummary />
            </Suspense>
            <Suspense fallback={<BudgetListSkeleton />}>
              <BudgetList />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}
