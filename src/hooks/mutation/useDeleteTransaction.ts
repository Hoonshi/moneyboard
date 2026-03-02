import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  transactionKeys,
  dashboardKeys,
  budgetKeys,
  categoryKeys,
  reportKeys,
} from "@/lib/queryKey";
import deleteTransaction from "@/apis/transaction/deleteTransaction";
import { useDateStore } from "@/stores/dateStore";
import toast from "react-hot-toast";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      queryClient.invalidateQueries({ queryKey: budgetKeys.list(year, month) });
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
      queryClient.invalidateQueries({ queryKey: categoryKeys.categorySummary(year, month) });
    },
    onError: () => {
      toast.error("거래 삭제에 실패하였습니다");
    },
  });
}
