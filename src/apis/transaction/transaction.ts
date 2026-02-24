import { createClient } from "@/lib/supabase/client";
import type { Transaction } from "@/types/transaction";

export default async function transaction(id: string): Promise<Transaction> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
          *,
          category:categories(name, icon, color)
        `,
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Transaction;
}
