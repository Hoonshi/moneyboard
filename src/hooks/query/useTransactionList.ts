import { useQuery } from "@tanstack/react-query";
import { transactionKeys } from "@/lib/queryKey";
import transactionList from "@/apis/transaction/transactionList";
import type { TransactionListParams } from "@/types/transaction";
import { DEFAULT_DASHBOARD_PARAMS } from "@/constants/transactionList";

export function useTransactionList(
  params: TransactionListParams = DEFAULT_DASHBOARD_PARAMS,
) {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: () => transactionList(params),
  });
}
