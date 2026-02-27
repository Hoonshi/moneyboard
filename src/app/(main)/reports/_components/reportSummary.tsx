"use client";

import useMonthlySummary from "@/hooks/query/useMonthlySummary";

export default function ReportSummary() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const { data } = useMonthlySummary(year, month);

  const savaRating =
    data?.income - data?.expense > 0
      ? `${Math.round(((data.income - data.expense) / data.income) * 100)}%`
      : "-";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {[
        {
          label: "총 수입",
          amount: `${data?.income.toLocaleString()} 원`,
          color: "text-blue-600",
          bg: "bg-blue-50",
        },
        {
          label: "총 지출",
          amount: `${data?.expense.toLocaleString()} 원`,
          color: "text-red-500",
          bg: "bg-red-50",
        },
        {
          label: "저축률",
          amount: savaRating,
          color: "text-green-600",
          bg: "bg-green-50",
        },
      ].map((c) => (
        <div key={c.label} className={`${c.bg} rounded-lg p-3.5`}>
          <p className="text-xs text-gray-500">{c.label}</p>
          <p className={`text-lg font-bold mt-1 ${c.color}`}>{c.amount}</p>
        </div>
      ))}
    </div>
  );
}
