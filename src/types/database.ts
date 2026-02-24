export type TransactionType = "income" | "expense";

// ── Row 타입 ──

export interface CategoryRow {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  type: TransactionType;
  color: string;
  is_default: boolean;
  sort_order: number;
  created_at: string;
}

export interface TransactionRow {
  id: string;
  user_id: string;
  category_id: string;
  type: TransactionType;
  amount: number;
  title: string;
  memo: string;
  date: string;
  recurring_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BudgetRow {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  year: number;
  month: number;
  created_at: string;
  updated_at: string;
}

export interface RecurringTransactionRow {
  id: string;
  user_id: string;
  category_id: string;
  type: TransactionType;
  amount: number;
  title: string;
  memo: string;
  day_of_month: number;
  is_active: boolean;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

// ── Insert 타입 (생성 시 필요한 필드만) ──

export type CategoryInsert = Pick<
  CategoryRow,
  "name" | "icon" | "type" | "color"
> &
  Partial<Pick<CategoryRow, "is_default" | "sort_order">>;

export type TransactionInsert = Pick<
  TransactionRow,
  "category_id" | "type" | "amount" | "title" | "date"
> &
  Partial<Pick<TransactionRow, "memo" | "recurring_id">>;

export type BudgetInsert = Pick<
  BudgetRow,
  "category_id" | "amount" | "year" | "month"
>;

export type RecurringTransactionInsert = Pick<
  RecurringTransactionRow,
  "category_id" | "type" | "amount" | "title" | "day_of_month"
> &
  Partial<Pick<RecurringTransactionRow, "memo" | "start_date" | "end_date">>;

// ── Update 타입 (수정 시 부분 업데이트) ──

export type CategoryUpdate = Partial<CategoryInsert>;
export type TransactionUpdate = Partial<TransactionInsert>;
export type BudgetUpdate = Partial<BudgetInsert>;
export type RecurringTransactionUpdate = Partial<RecurringTransactionInsert> &
  Partial<Pick<RecurringTransactionRow, "is_active">>;

// ── RPC 응답 타입 ──

export interface MonthlySummary {
  total_income: number;
  total_expense: number;
  balance: number;
}

export interface CategorySummary {
  category_id: string;
  category_name: string;
  category_icon: string;
  category_color: string;
  total_amount: number;
}

export interface BudgetStatus {
  budget_id: string;
  category_id: string;
  category_name: string;
  category_icon: string;
  category_color: string;
  budget_amount: number;
  spent_amount: number;
  percentage: number;
}

export interface DailyTotal {
  day: number;
  income: number;
  expense: number;
}
