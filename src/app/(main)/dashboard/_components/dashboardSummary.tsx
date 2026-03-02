"use client";

import useMonthlySummary from "@/hooks/query/useMonthlySummary";
import { useDateStore } from "@/stores/dateStore";

export default function DashboardSummary() {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);
  const { data: monthlyData } = useMonthlySummary(year, month);

  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        {
          label: "이번 달 수입",
          amount: monthlyData.income,
          color: "text-gray-800",
          bg: "bg-[#e7f5ff]",
        },
        {
          label: "이번 달 지출",
          amount: monthlyData.expense,
          color: "text-gray-800",
          bg: "bg-[#fff4e6]",
        },
        {
          label: "잔액",
          amount: monthlyData.balance,
          color: "text-gray-800",
          bg: "bg-[#ebfbee]",
        },
      ].map((c) => (
        <div key={c.label} className={`${c.bg} rounded-lg p-3.5`}>
          <p className="text-[12px] pb-2 text-gray-500">{c.label}</p>
          <p className={`text-md font-semibold mt-1 ${c.color}`}>
            {c.amount.toLocaleString()}원
          </p>
        </div>
      ))}
    </div>
  );
}
