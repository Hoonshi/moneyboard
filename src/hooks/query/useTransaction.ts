import { useQuery } from "@tanstack/react-query";
import { transactionKeys } from "@/lib/queryKey";
import transaction from "@/apis/transaction/transaction";

export function useTransaction(id: string) {
  return useQuery({
    queryKey: transactionKeys.detail(id),
    queryFn: () => transaction(id),

    enabled: !!id,
  });
}
