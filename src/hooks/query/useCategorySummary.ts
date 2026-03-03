import { useSuspenseQuery } from "@tanstack/react-query";
import categorySummary from "@/apis/dashboard/categorySummary";
import { categoryKeys } from "@/lib/queryKey";
import { createClient } from "@/lib/supabase/client";

export default function useCategorySummary(year: number, month: number) {
  const supabase = createClient();
  return useSuspenseQuery({
    queryKey: categoryKeys.categorySummary(year, month),
    queryFn: () => categorySummary(supabase, year, month),
  });
}
