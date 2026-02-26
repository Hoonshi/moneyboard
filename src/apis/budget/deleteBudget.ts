import { createClient } from "@/lib/supabase/client";

export async function deleteBudget(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("budgets").delete().eq("id", id);

  if (error) throw error;
}
