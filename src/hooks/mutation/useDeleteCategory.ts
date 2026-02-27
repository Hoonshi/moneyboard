import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "@/apis/categories/deleteCategory";
import { categoryKeys } from "@/lib/queryKey";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}
