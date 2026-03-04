import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchDailyTotal(year: number, month: number, client?: SupabaseClient) {
  const supabase = client ?? createClient();
  const { data, error } = await supabase.rpc("get_daily_totals", {
    p_year: year,
    p_month: month,
  });

  if (error) throw error;
  return data;
}
