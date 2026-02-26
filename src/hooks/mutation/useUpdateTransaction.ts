import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionKeys, dashboardKeys } from "@/lib/queryKey";
import { TransactionUpdate } from "@/types/database";
import updateTransaction from "@/apis/transaction/updateTransaction";

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...updates }: TransactionUpdate & { id: string }) =>
      updateTransaction({ id, ...updates }),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: transactionKeys.detail(data.id),
      });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}
