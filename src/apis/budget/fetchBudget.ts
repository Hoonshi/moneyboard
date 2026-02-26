import { createClient } from "@/lib/supabase/client";

export async function fetchBudget(year: number, month: number) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_budget_status", {
    p_year: year,
    p_month: month,
  });

  if (error) throw error;
  return data;
}
