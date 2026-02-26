import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionKeys, dashboardKeys } from "@/lib/queryKey";
import type { TransactionInsert } from "@/types/database";
import createTransaction from "@/apis/transaction/createTransaction";

export function useCreateTransaction({
  formReset,
}: {
  formReset?: () => void;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTransaction: TransactionInsert) =>
      createTransaction(newTransaction),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      formReset?.();
    },
  });
}
