import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  transactionKeys,
  dashboardKeys,
  budgetKeys,
  calendarKeys,
  reportKeys,
} from "@/lib/queryKey";
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
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
      queryClient.invalidateQueries({ queryKey: calendarKeys.all });
      queryClient.invalidateQueries({ queryKey: reportKeys.all });

      formReset?.();
    },
  });
}
