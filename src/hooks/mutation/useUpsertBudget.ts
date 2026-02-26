import { upsertBudget } from "@/apis/budget/upsertBudget";
import { BudegetUpsertParams } from "@/types/budeget";
import { useMutation } from "@tanstack/react-query";

export default function useUpsertBudget() {
  return useMutation({
    mutationFn: (param: BudegetUpsertParams) => upsertBudget(param),
    onSuccess: () => {},
  });
}
