import { fetchDailyTotal } from "@/apis/calander/fetchDailyTotal";
import { reportKeys } from "@/lib/queryKey";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export default function useFetchDailyTotal(year: number, month: number) {
  const supabase = createClient();
  return useSuspenseQuery({
    queryKey: reportKeys.dailyTotals(year, month),
    queryFn: () => fetchDailyTotal(supabase, year, month),
  });
}
