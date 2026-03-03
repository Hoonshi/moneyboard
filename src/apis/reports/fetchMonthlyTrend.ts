import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchMonthlyTrend(
  supabase: SupabaseClient,
  months: number = 6,
) {
  const { data, error } = await supabase.rpc("get_monthly_trend", {
    p_months: months,
  });

  if (error) throw error;
  return data;
}
