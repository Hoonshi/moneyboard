import type { TransactionListParams } from "@/types/transaction";

//거래 관련 쿼리키
export const transactionKeys = {
  //전체 키
  all: ["transactions"] as const,
  //거래 목록 키
  lists: () => [...transactionKeys.all, "list"] as const,
  list: (params: TransactionListParams) =>
    [...transactionKeys.lists(), params] as const,
  //거래 상세 키
  details: () => [...transactionKeys.all, "detail"] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
};

//카테고리 쿼리키
export const categoryKeys = {
  all: ["categories"] as const,
  list: (type?: string) => [...categoryKeys.all, type] as const,
  categorySummary: (year: number, month: number) =>
    [...categoryKeys.all, "categorySummary", year, month] as const,
};

//대시보드 쿼리키
export const dashboardKeys = {
  all: ["dashboard"] as const,
  monthlySummary: (year: number, month: number) =>
    [...dashboardKeys.all, "monthlySummary", year, month] as const,
};

//예산(budget) 쿼리키
export const budgetKeys = {
  all: ["budget"] as const,
  list: (year: number, month: number) =>
    [...budgetKeys.all, year, month] as const,
  item: (id: string) => [...budgetKeys.all, "item", id] as const,
};

//캘린더 쿼리키 = dailyTotal 쿼리키
export const calendarKeys = {
  all: ["calendar"] as const,
  daily: (year: number, month: number) =>
    [...calendarKeys.all, "daily", year, month] as const,
};

//보고서(report) 쿼리키 = monthlyTrend 쿼리키
export const reportKeys = {
  all: ["report"] as const,
  monthlyTrend: (months: number) =>
    [...reportKeys.all, "monthlyTrend", months] as const,
  dailyTotals: (year: number, month: number) =>
    [...reportKeys.all, "dailyTotals", year, month] as const,
};
