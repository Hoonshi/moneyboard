import { useSuspenseQuery } from "@tanstack/react-query";
import { transactionKeys } from "@/lib/queryKey";
import transactionList from "@/apis/transaction/transactionList";
import type { TransactionListParams } from "@/types/transaction";
import { DEFAULT_DASHBOARD_PARAMS } from "@/constants/transactionList";
import { createClient } from "@/lib/supabase/client";

export function useTransactionList(
  params: TransactionListParams = DEFAULT_DASHBOARD_PARAMS,
) {
  const supabase = createClient();
  return useSuspenseQuery({
    queryKey: transactionKeys.list(params),
    queryFn: () => transactionList(supabase, params),
  });
}
