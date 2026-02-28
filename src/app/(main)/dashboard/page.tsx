import DashboardSummary from "./_components/dashboardSummary";
import DashboardChart from "./_components/dashboardChart";
import DashboardTransactionList from "./_components/dashboardTransactionList";
import DashboardHeader from "./_components/dashboardHeader";
// prefetch를 위한 모듈
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import { dashboardKeys } from "@/lib/queryKey";
import { categoryKeys } from "@/lib/queryKey";
import monthlySummary from "@/apis/dashboard/monthlySummary";
import categorySummary from "@/apis/dashboard/categorySummary";
import { transactionKeys } from "@/lib/queryKey";
import transactionList from "@/apis/transaction/transactionList";
import { DEFAULT_DASHBOARD_PARAMS } from "@/constants/transactionList";

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [{ ...dashboardKeys.monthlySummary(year, month) }],
      queryFn: () => monthlySummary(year, month),
    }),
    queryClient.prefetchQuery({
      queryKey: [{ ...categoryKeys.categorySummary(year, month) }],
      queryFn: () => categorySummary(year, month),
    }),
    queryClient.prefetchQuery({
      queryKey: transactionKeys.list(DEFAULT_DASHBOARD_PARAMS),
      queryFn: () => transactionList(DEFAULT_DASHBOARD_PARAMS),
    }),
  ]);

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      {/* 대시보드헤더 */}
      <DashboardHeader />

      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="space-y-4">
          <HydrationBoundary state={dehydrate(queryClient)}>
            {/* 요약 카드 */}
            <DashboardSummary />
            {/* 차트 및 카테고리*/}
            <DashboardChart />
            {/*최근거래내역*/}
            <DashboardTransactionList />
          </HydrationBoundary>
        </div>{" "}
      </div>
    </div>
  );
}
