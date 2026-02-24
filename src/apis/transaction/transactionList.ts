import { createClient } from "@/lib/supabase/client";
import type {
  Transaction,
  TransactionListParams,
  TransactionListResponse,
} from "@/types/transaction";

export default async function transactionList(
  params: TransactionListParams,
): Promise<TransactionListResponse> {
  const supabase = createClient();

  const { filter, sort, page, pageSize } = params;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("transactions")
    .select(
      `
          *,
          category:categories(name, icon, color)
        `,
      { count: "exact" },
    )
    .range(from, to);

  // 필터 적용
  if (filter.type !== "all") {
    query = query.eq("type", filter.type);
  }
  if (filter.categoryId) {
    query = query.eq("category_id", filter.categoryId);
  }
  if (filter.startDate) {
    query = query.gte("date", filter.startDate);
  }
  if (filter.endDate) {
    query = query.lte("date", filter.endDate);
  }
  if (filter.search) {
    query = query.ilike("title", `%${filter.search}%`);
  }

  // 정렬 적용
  query = query.order(sort.key, { ascending: sort.direction === "asc" });

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    data: (data as Transaction[]) ?? [],
    totalCount: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}
