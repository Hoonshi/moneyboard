"use client";

import useMonthlySummary from "@/hooks/query/useMonthlySummary";

export function MonthlyComparison() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  const { data: current } = useMonthlySummary(year, month);
  const { data: previous } = useMonthlySummary(prevYear, prevMonth);

  // 수입 변화
  const incomeChange = (current?.income ?? 0) - (previous?.income ?? 0);
  const incomeChangeRate = previous?.income
    ? Math.round((incomeChange / previous.income) * 100)
    : 0;

  // 지출 변화
  const expenseChange = (current?.expense ?? 0) - (previous?.expense ?? 0);
  const expenseChangeRate = previous?.expense
    ? Math.round((expenseChange / previous.expense) * 100)
    : 0;

  // 저축률
  const savingsRate = current?.income
    ? Math.round(((current.income - current.expense) / current.income) * 100)
    : 0;

  const prevSavingsRate = previous?.income
    ? Math.round(((previous.income - previous.expense) / previous.income) * 100)
    : 0;

  const savingsRateChange = savingsRate - prevSavingsRate;

  return (
    <div className="bg-white rounded-xl p-4">
      <p className="text-xs font-bold text-gray-800 mb-3">전월 대비</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-blue-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-500">수입</p>
          <p className="text-xs font-bold text-blue-600 mt-0.5">
            +{current?.income}
          </p>
          <p className="text-[10px] text-green-500">
            {incomeChangeRate >= 0 ? "▲" : "▼"} {incomeChangeRate}%
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-500">지출</p>
          <p className="text-xs font-bold text-red-500 mt-0.5">
            +{current?.expense}
          </p>
          <p className="text-[10px] text-red-400">
            {" "}
            {expenseChangeRate >= 0 ? "▲" : "▼"} {expenseChangeRate}%
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-2.5">
          <p className="text-[10px] text-gray-500">저축률</p>
          <p className="text-xs font-bold text-green-600 mt-0.5">
            {savingsRate}%
          </p>
          <p className="text-[10px] text-red-400">
            {savingsRateChange >= 0 ? "▲" : "▼"} {savingsRateChange}%p
          </p>
        </div>
      </div>
    </div>
  );
}
