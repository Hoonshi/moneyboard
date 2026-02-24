import type { TransactionRow, TransactionType, CategoryRow } from "./database";

// 거래 + 카테고리 JOIN된 형태 (리스트, 상세에서 사용)
export interface Transaction extends TransactionRow {
  category: Pick<CategoryRow, "name" | "icon" | "color">;
}

// 거래 리스트 필터
export interface TransactionFilter {
  type: TransactionType | "all";
  categoryId: string | null;
  startDate: string | null; // "YYYY-MM-DD"
  endDate: string | null;
  search: string;
}

// 거래 리스트 정렬
export type TransactionSortKey = "date" | "amount" | "title";
export type SortDirection = "asc" | "desc";

export interface TransactionSort {
  key: TransactionSortKey;
  direction: SortDirection;
}

// 거래 리스트 페이지네이션
export interface TransactionListParams {
  filter: TransactionFilter;
  sort: TransactionSort;
  page: number;
  pageSize: number;
}

export interface TransactionListResponse {
  data: Transaction[];
  totalCount: number;
  totalPages: number;
}
