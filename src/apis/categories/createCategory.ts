import { createClient } from "@/lib/supabase/client";

export async function createCategory(params: {
  name: string;
  icon: string;
  type: "expense" | "income";
  color: string;
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .insert(params)
    .select()
    .single();

  if (error) throw error;
  return data;
}
