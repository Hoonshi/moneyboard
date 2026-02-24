import { createClient } from "@/lib/supabase/client";
import type { TransactionInsert, TransactionRow } from "@/types/database";

export default async function createTransaction(
  newTransaction: TransactionInsert,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .insert(newTransaction)
    .select()
    .single();

  if (error) throw error;
  return data as TransactionRow;
}
