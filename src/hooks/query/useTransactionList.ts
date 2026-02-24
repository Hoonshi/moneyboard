import { useQuery } from "@tanstack/react-query";
import { transactionKeys } from "@/lib/queryKey";
import type { TransactionListParams } from "@/types/transaction";
import transactionList from "@/apis/transaction/transactionList";

export function useTransactionList(params: TransactionListParams) {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: () => transactionList(params),
  });
}
