import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  transactionKeys,
  dashboardKeys,
  budgetKeys,
  categoryKeys,
  reportKeys,
} from "@/lib/queryKey";
import type { TransactionInsert } from "@/types/database";
import createTransaction from "@/apis/transaction/createTransaction";
import { useDateStore } from "@/stores/dateStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useCreateTransaction({
  formReset,
}: {
  formReset?: () => void;
}) {
  const router = useRouter();
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTransaction: TransactionInsert) =>
      createTransaction(newTransaction),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      queryClient.invalidateQueries({ queryKey: budgetKeys.list(year, month) });
      queryClient.invalidateQueries({ queryKey: reportKeys.all });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.categorySummary(year, month),
      });
      formReset?.();
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("거래 생성에 실패하였습니다");
    },
  });
}
