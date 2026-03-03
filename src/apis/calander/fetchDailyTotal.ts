import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchDailyTotal(
  supabase: SupabaseClient,
  year: number,
  month: number,
) {
  const { data, error } = await supabase.rpc("get_daily_totals", {
    p_year: year,
    p_month: month,
  });

  if (error) throw error;
  return data;
}
