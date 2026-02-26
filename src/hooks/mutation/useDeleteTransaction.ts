import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionKeys, dashboardKeys } from "@/lib/queryKey";
import deleteTransaction from "@/apis/transaction/deleteTransaction";

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}
