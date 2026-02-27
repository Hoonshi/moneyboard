import { createClient } from "@/lib/supabase/client";

export async function deleteCategory(id: string) {
  const supabase = createClient();
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw error;
}
