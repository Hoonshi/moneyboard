"use client";

import useMonthlySummary from "@/hooks/query/useMonthlySummary";
import { useDateStore } from "@/stores/dateStore";

export default function ReportSummary() {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);

  const { data } = useMonthlySummary(year, month);

  const savaRating =
    data.income - data.expense > 0
      ? `${Math.round(((data.income - data.expense) / data.income) * 100)}%`
      : "-";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {[
        {
          label: "총 수입",
          amount: `${data.income.toLocaleString()} 원`,
          color: "text-gray-800",
          bg: "bg-[#e7f5ff]",
        },
        {
          label: "총 지출",
          amount: `${data.expense.toLocaleString()} 원`,
          color: "text-gray-800",
          bg: "bg-[#fff4e6]",
        },
        {
          label: "저축률",
          amount: savaRating,
          color: "text-gray-800",
          bg: "bg-[#ebfbee]",
        },
      ].map((c) => (
        <div key={c.label} className={`${c.bg} rounded-lg p-3.5`}>
          <p className="text-xs text-gray-500">{c.label}</p>
          <p className={`text-md font-semibold mt-1 ${c.color}`}>{c.amount}</p>
        </div>
      ))}
    </div>
  );
}
