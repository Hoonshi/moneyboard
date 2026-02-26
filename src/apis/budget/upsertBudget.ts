import { createClient } from "@/lib/supabase/client";
import { BudegetUpsertParams } from "@/types/budeget";

// 있으면 수정, 없으면 추가 -> upsert
export async function upsertBudget(params: BudegetUpsertParams) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("budgets")
    .upsert(params)
    .select()
    .single();

  if (error) throw error;
  return data;
}
