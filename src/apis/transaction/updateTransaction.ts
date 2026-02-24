import { createClient } from "@/lib/supabase/client";
import { TransactionRow, TransactionUpdate } from "@/types/database";

export default async function updateTransaction({
  id,
  ...updates
}: TransactionUpdate & { id: string }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as TransactionRow;
}
