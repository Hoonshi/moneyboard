import dynamic from "next/dynamic";
import ReportsHeader from "./_components/reportsHeader";

const MonthlyComparison = dynamic(
  () =>
    import("./_components/monthlyComparison").then(
      (mod) => mod.MonthlyComparison,
    ),
);
const DailyTrendChart = dynamic(
  () =>
    import("./_components/dailyTrendChart").then((mod) => mod.DailyTrendChart),
);
const TopExpenses = dynamic(
  () => import("./_components/topExpenses").then((mod) => mod.TopExpenses),
);
const ReportSummary = dynamic(() => import("./_components/reportSummary"));
const MonthlyTrend = dynamic(
  () => import("./_components/monthlyTrendChart"),
);
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/get-query-client";
import {
  reportKeys,
  calendarKeys,
  dashboardKeys,
  transactionKeys,
} from "@/lib/queryKey";
import { fetchMonthlyTrend } from "@/apis/reports/fetchMonthlyTrend";
import { fetchDailyTotal } from "@/apis/calander/fetchDailyTotal";
import monthlySummary from "@/apis/dashboard/monthlySummary";
import transactionList from "@/apis/transaction/transactionList";
import type { TransactionListParams } from "@/types/transaction";
import { DEFAULT_DASHBOARD_PARAMS } from "@/constants/transactionList";
import { Suspense } from "react";
import { ReportSummarySkeleton } from "@/components/skeleton/reportSummarySkeleton";
import { MonthlyTrendChartSkeleton } from "@/components/skeleton/monthlyTrendChartSkeleton";
import { MonthlyComparisonSkeleton } from "@/components/skeleton/monthlyComparisonSkeleton";
import { DailyTrendChartSkeleton } from "@/components/skeleton/dailyTrendChartSkeleton";
import { TopExpensesSkeleton } from "@/components/skeleton/topExpensesSkeleton";
import { createClient as createServerClient } from "@/lib/supabase/server";

export default async function ReportsPage() {
  const queryClient = getQueryClient();
  const supabase = await createServerClient();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const topTransactionParams: TransactionListParams = {
    filter: {
      type: "all",
      categoryId: null,
      startDate: `${year}-${String(month).padStart(2, "0")}-01`,
      endDate: `${year}-${String(month).padStart(2, "0")}-${new Date(year, month, 0).getDate()}`,
      search: "",
    },
    sort: { key: "date", direction: "desc" },
    page: 1,
    pageSize: 5,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: reportKeys.monthlyTrend(6),
      queryFn: () => fetchMonthlyTrend(6, supabase),
    }),
    queryClient.prefetchQuery({
      queryKey: calendarKeys.daily(year, month),
      queryFn: () => fetchDailyTotal(year, month, supabase),
    }),
    queryClient.prefetchQuery({
      queryKey: dashboardKeys.monthlySummary(year, month),
      queryFn: () => monthlySummary(year, month, supabase),
    }),
    queryClient.prefetchQuery({
      queryKey: transactionKeys.list(topTransactionParams),
      queryFn: () => transactionList(topTransactionParams, supabase),
    }),
    queryClient.prefetchQuery({
      queryKey: transactionKeys.list(DEFAULT_DASHBOARD_PARAMS),
      queryFn: () => transactionList(DEFAULT_DASHBOARD_PARAMS, supabase),
    }),
  ]);

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <ReportsHeader />
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="space-y-4">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<ReportSummarySkeleton />}>
              {/* 요약 */}
              <ReportSummary />
            </Suspense>
            <Suspense fallback={<MonthlyTrendChartSkeleton />}>
              {/* 차트 */}
              <MonthlyTrend />
            </Suspense>
            {/* 전월대비 */}
            <Suspense fallback={<MonthlyComparisonSkeleton />}>
              <MonthlyComparison />
            </Suspense>
            <Suspense fallback={<DailyTrendChartSkeleton />}>
              {/* 일별 지출 추이 */}
              <DailyTrendChart />
            </Suspense>
            <Suspense fallback={<TopExpensesSkeleton />}>
              {/* 상위 지출 5개 */}
              <TopExpenses />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
    </div>
  );
}
