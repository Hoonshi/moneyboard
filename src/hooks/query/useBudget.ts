import { fetchBudget } from "@/apis/budget/fetchBudget";
import { useQuery } from "@tanstack/react-query";

export default function useBudget(year: number, month: number) {
  return useQuery({
    queryKey: ["budget", year, month],
    queryFn: () => fetchBudget(year, month),
  });
}
