"use client";

import { AlertTriangle } from "lucide-react";
import useBudget from "@/hooks/query/useBudget";
import { useDateStore } from "@/stores/dateStore";
import { BudgetStatus } from "@/types/database";

export function BudgetList() {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);
  const { data: budget } = useBudget(year, month);

  return (
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
  );
}
