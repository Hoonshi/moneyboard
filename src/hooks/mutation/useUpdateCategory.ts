import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "@/apis/categories/updateCategory";
import { categoryKeys } from "@/lib/queryKey";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...params
    }: {
      id: string;
      name: string;
      icon: string;
      type: "expense" | "income";
      color: string;
    }) => updateCategory(id, params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
}
