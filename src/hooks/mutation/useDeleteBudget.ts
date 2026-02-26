import { deleteBudget } from "@/apis/budget/deleteBudget";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteBudget() {
  return useMutation({
    mutationFn: (id: string) => deleteBudget(id),
    onSuccess: () => {},
  });
}
