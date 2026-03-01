import DashboardSummary from "./_components/dashboardSummary";
import DashboardChart from "./_components/dashboardChart";
import DashboardTransactionList from "./_components/dashboardTransactionList";
import DashboardHeader from "./_components/dashboardHeader";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { dashboardKeys, categoryKeys, transactionKeys } from "@/lib/queryKey";
import monthlySummary from "@/apis/dashboard/monthlySummary";
import categorySummary from "@/apis/dashboard/categorySummary";
import transactionList from "@/apis/transaction/transactionList";
import { DEFAULT_DASHBOARD_PARAMS } from "@/constants/transactionList";
import { Suspense } from "react";
import { DashboardSummarySkeleton } from "@/components/skeleton/dashboardSummarySkeleton";
import { DashboardChartSkeleton } from "@/components/skeleton/dashboardChartSkeleton";
import { DashboardTransactionListSkeleton } from "@/components/skeleton/dashboardTransactionListSkeleton";

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: dashboardKeys.monthlySummary(year, month),
      queryFn: () => monthlySummary(year, month),
    }),
    queryClient.prefetchQuery({
      queryKey: categoryKeys.categorySummary(year, month),
      queryFn: () => categorySummary(year, month),
    }),
    queryClient.prefetchQuery({
      queryKey: transactionKeys.list(DEFAULT_DASHBOARD_PARAMS),
      queryFn: () => transactionList(DEFAULT_DASHBOARD_PARAMS),
    }),
  ]);

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <DashboardHeader />
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="space-y-4">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<DashboardSummarySkeleton />}>
              <DashboardSummary />
            </Suspense>
            <Suspense fallback={<DashboardChartSkeleton />}>
              <DashboardChart />
            </Suspense>
            <Suspense fallback={<DashboardTransactionListSkeleton />}>
              <DashboardTransactionList />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}
