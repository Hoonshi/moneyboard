import { createClient } from "@/lib/supabase/client";

export default async function deleteTransaction(id: string) {
  const supabase = createClient();

  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) throw error;
}
