import { getQueryClient } from "@/lib/get-query-client";
import { CalendarContent } from "./_components/calendarContent";
import DateButton from "@/components/ui/dateButton";
import { DEFAULT_DASHBOARD_PARAMS } from "@/constants/transactionList";
import { calendarKeys, dashboardKeys, transactionKeys } from "@/lib/queryKey";
import type { TransactionListParams } from "@/types/transaction";
import transactionList from "@/apis/transaction/transactionList";
import monthlySummary from "@/apis/dashboard/monthlySummary";
import { fetchDailyTotal } from "@/apis/calander/fetchDailyTotal";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function CalendarPage() {
  const queryClient = getQueryClient();

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const mm = month.toString().padStart(2, "0");
  const dd = day.toString().padStart(2, "0");
  const today = `${year}-${mm}-${dd}`;

  const totalTransaction: TransactionListParams = {
    filter: {
      type: "all",
      categoryId: null,
      search: "",
      startDate: `${year}-${mm}-01`,
      endDate: `${year}-${mm}-31`,
    },
    sort: { key: "date", direction: "desc" },
    page: 1,
    pageSize: 50,
  };

  const todayTransaction: TransactionListParams = {
    filter: {
      type: "all",
      categoryId: null,
      search: "",
      startDate: today,
      endDate: today,
    },
    sort: { key: "date", direction: "desc" },
    page: 1,
    pageSize: 50,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: transactionKeys.list(DEFAULT_DASHBOARD_PARAMS),
      queryFn: () => transactionList(DEFAULT_DASHBOARD_PARAMS),
    }),
    queryClient.prefetchQuery({
      queryKey: transactionKeys.list(totalTransaction),
      queryFn: () => transactionList(totalTransaction),
    }),
    queryClient.prefetchQuery({
      queryKey: transactionKeys.list(todayTransaction),
      queryFn: () => transactionList(todayTransaction),
    }),
    queryClient.prefetchQuery({
      queryKey: dashboardKeys.monthlySummary(year, month),
      queryFn: () => monthlySummary(year, month),
    }),
    queryClient.prefetchQuery({
      queryKey: calendarKeys.daily(year, month),
      queryFn: () => fetchDailyTotal(year, month),
    }),
  ]);

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div>
          <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
            캘린더
          </h1>
          <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
            날짜별 거래 내역
          </p>
        </div>
        <DateButton />
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CalendarContent />
        </HydrationBoundary>
      </div>
    </div>
  );
}
