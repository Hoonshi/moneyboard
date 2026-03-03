import { fetchBudget } from "@/apis/budget/fetchBudget";
import { useSuspenseQuery } from "@tanstack/react-query";
import { budgetKeys } from "@/lib/queryKey";
import { createClient } from "@/lib/supabase/client";

export default function useBudget(year: number, month: number) {
  const supabase = createClient();
  return useSuspenseQuery({
    queryKey: budgetKeys.list(year, month),
    queryFn: () => fetchBudget(supabase, year, month),
  });
}
