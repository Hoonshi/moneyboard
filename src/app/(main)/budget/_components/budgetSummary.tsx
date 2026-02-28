"use client";

import useBudget from "@/hooks/query/useBudget";
import { useDateStore } from "@/stores/dateStore";
import { BudgetStatus } from "@/types/database";

export function BudgetSummary() {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);
  const { data: budget } = useBudget(year, month);

  const totalBudget =
    budget?.reduce(
      (acc: number, cur: BudgetStatus) => acc + cur.budget_amount,
      0,
    ) ?? 0;
  const totalSpent =
    budget?.reduce((acc: number, cur: BudgetStatus) => acc + cur.spent, 0) ?? 0;
  const totalRemaining = totalBudget - totalSpent;
  const overallPercentage =
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
      <div>
        <p className="text-xs text-gray-500">이번 달 총 예산</p>
        <p className="text-lg font-bold text-gray-800">
          ₩{totalBudget.toLocaleString()}원
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">사용 금액</p>
        <p className="text-lg font-bold text-red-500">
          ₩{totalSpent.toLocaleString()}원
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">남은 금액</p>
        <p className="text-lg font-bold text-green-600">
          ₩{totalRemaining.toLocaleString()}원
        </p>
      </div>
      <div className="w-32">
        <div className="text-center text-xs text-gray-500 mb-1">
          {overallPercentage}%
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-orange-400 h-2.5 rounded-full"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
