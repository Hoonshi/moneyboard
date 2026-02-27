import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "@/apis/categories/createCategory";
import { categoryKeys } from "@/lib/queryKey";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}
