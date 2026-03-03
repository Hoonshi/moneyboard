import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchBudget(
  supabase: SupabaseClient,
  year: number,
  month: number,
) {
  const { data, error } = await supabase.rpc("get_budget_status", {
    p_year: year,
    p_month: month,
  });

  if (error) throw error;
  return data;
}
