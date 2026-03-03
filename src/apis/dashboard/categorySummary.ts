import type { SupabaseClient } from "@supabase/supabase-js";

export default async function categorySummary(
  supabase: SupabaseClient,
  year: number,
  month: number,
) {
  const { data, error } = await supabase.rpc("get_category_summary", {
    p_year: year,
    p_month: month,
  });

  if (error) throw error;
  return data;
}
