import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionKeys } from "@/lib/queryKey";
import type { TransactionInsert } from "@/types/database";
import createTransaction from "@/apis/transaction/createTransaction";

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTransaction: TransactionInsert) =>
      createTransaction(newTransaction),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.lists() });
    },
  });
}
