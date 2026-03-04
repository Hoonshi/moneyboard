import { createClient } from "@/lib/supabase/client";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function fetchMonthlyTrend(months: number = 6, client?: SupabaseClient) {
  const supabase = client ?? createClient();
  const { data, error } = await supabase.rpc("get_monthly_trend", {
    p_months: months,
  });

  if (error) throw error;
  return data;
}
