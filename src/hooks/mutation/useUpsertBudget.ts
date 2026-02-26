import { upsertBudget } from "@/apis/budget/upsertBudget";
import { budgetKeys } from "@/lib/queryKey";
import { BudegetUpsertParams } from "@/types/budeget";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export default function useUpsertBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (param: BudegetUpsertParams) => upsertBudget(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
    },
  });
}
