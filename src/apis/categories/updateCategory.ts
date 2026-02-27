import { createClient } from "@/lib/supabase/client";

export async function updateCategory(
  id: string,
  params: {
    name: string;
    icon: string;
    type: "expense" | "income";
    color: string;
  },
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .update(params)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
