"use client";

import useBudget from "@/hooks/query/useBudget";
import { BudgetStatus } from "@/types/database";
import { AlertTriangle } from "lucide-react";

export function BudgetContent() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: budget } = useBudget(year, month);
  console.log(budget);

  const totalBudget = budget?.reduce((acc: number, cur: BudgetStatus) => {
    return acc + cur.budget_amount;
  }, 0);
  const totalSpent = budget?.reduce((acc: number, cur: BudgetStatus) => {
    return acc + cur.spent;
  }, 0);
  const totalRemaining =
    totalBudget && totalSpent ? totalBudget - totalSpent : 0;
  const overallPercentage =
    totalBudget && totalSpent
      ? Math.round((totalSpent / totalBudget) * 100)
      : 0;

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">이번 달 총 예산</p>
          <p className="text-lg font-bold text-gray-800">
            ₩{totalBudget?.toLocaleString()}원
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">사용 금액</p>
          <p className="text-lg font-bold text-red-500">
            ₩{totalSpent?.toLocaleString()}원
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">남은 금액</p>
          <p className="text-lg font-bold text-green-600">
            ₩{totalRemaining?.toLocaleString()}원
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

      {/* Budget list */}
      <div className="space-y-2.5">
        {budget?.map((b: BudgetStatus) => {
          const pct =
            b.budget_amount > 0
              ? Math.round((b.spent / b.budget_amount) * 100)
              : 0;
          const isWarning = pct >= 50;
          return (
            <div
              key={b.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                    <div>{b.icon}</div>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {b.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    ₩{(b.spent / 10000).toFixed(0)}만 / ₩
                    {(b.budget_amount / 10000).toFixed(0)}만
                  </span>
                  <span
                    className={`text-xs font-bold ${isWarning ? "text-red-500" : "text-gray-600"}`}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className=" h-2 rounded-full"
                  style={{
                    backgroundColor: isWarning ? "#f87171" : b.color,
                    width: `${Math.min(pct, 100)}%`,
                  }}
                />
              </div>
              {isWarning && (
                <div className="flex items-center gap-1 mt-1.5">
                  <AlertTriangle size={11} className="text-red-400" />
                  <p className="text-xs text-red-400">
                    예산의 {pct}%를 사용했어요
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
