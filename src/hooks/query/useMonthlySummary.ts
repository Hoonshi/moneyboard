import monthlySummary from "@/apis/dashboard/monthlySummary";
import { dashboardKeys } from "@/lib/queryKey";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export default function useMonthlySummary(year: number, month: number) {
  const supabase = createClient();
  return useSuspenseQuery({
    queryKey: dashboardKeys.monthlySummary(year, month),
    queryFn: () => monthlySummary(supabase, year, month),
  });
}
