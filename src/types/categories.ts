import type { CategoryRow, TransactionType } from "./database";

// 카테고리 + 사용 횟수 (설정 페이지에서 사용)
export interface CategoryWithCount extends CategoryRow {
  transaction_count: number;
}

// 카테고리 필터 (특정 타입만 조회)
export interface CategoryFilterParams {
  type?: TransactionType;
}

// 카테고리 폼 데이터 (생성/수정 공통)
export interface CategoryFormData {
  name: string;
  icon: string;
  type: "expense" | "income";
  color: string;
}

// 카테고리 수정 폼 데이터 - id 추가한거
export interface CategoryUpdateFormData extends CategoryFormData {
  id: string;
}
