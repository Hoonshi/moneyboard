import type { BudgetRow, CategoryRow } from "./database";

// 예산 + 카테고리 + 사용현황 (예산 관리 페이지에서 사용)
export interface BudgetWithStatus extends BudgetRow {
  category: Pick<CategoryRow, "name" | "icon" | "color">;
  spent: number;
  percentage: number;
}

// 예산 총 요약
export interface BudgetOverview {
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  overallPercentage: number;
}

export interface BudegetUpsertParams {
  category_id: string;
  year: number;
  month: number;
  amount: number;
}
