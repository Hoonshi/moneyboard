import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/lib/queryKey";
import type { TransactionType } from "@/types/database";
import fetchReportCategories from "@/apis/categories/fetchReportCategories";

export function useCategories(type?: TransactionType) {
  return useSuspenseQuery({
    queryKey: categoryKeys.list(type),
    queryFn: () => fetchReportCategories(type),
  });
}
