import { fetchMonthlyTrend } from "@/apis/reports/fetchMonthlyTrend";
import { useSuspenseQuery } from "@tanstack/react-query";
import { reportKeys } from "@/lib/queryKey";
import { createClient } from "@/lib/supabase/client";

export default function useFetchMonthlyTrend(months: number = 6) {
  const supabase = createClient();
  return useSuspenseQuery({
    queryKey: reportKeys.monthlyTrend(months),
    queryFn: () => fetchMonthlyTrend(supabase, months),
  });
}
