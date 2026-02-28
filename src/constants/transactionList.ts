import { TransactionListParams } from "@/types/transaction";

export const DEFAULT_DASHBOARD_PARAMS: TransactionListParams = {
  filter: { type: "all", categoryId: null, search: "" },
  sort: { key: "date", direction: "desc" },
  page: 1,
  pageSize: 5,
};
