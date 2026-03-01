import { fetchDailyTotal } from "@/apis/calander/fetchDailyTotal";
import { reportKeys } from "@/lib/queryKey";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useFetchDailyTotal(year: number, month: number) {
  return useSuspenseQuery({
    queryKey: reportKeys.dailyTotals(year, month),
    queryFn: () => fetchDailyTotal(year, month),
  });
}
