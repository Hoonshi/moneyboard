"use client";

import { useDateStore } from "@/stores/dateStore";
import useMonthlySummary from "@/hooks/query/useMonthlySummary";
import { useTransactionList } from "@/hooks/query/useTransactionList";

export function MonthlySummarySection() {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);
  const lastDay = new Date(year, month, 0).getDate();
  const endDateStr = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  const { data: monthlySummary } = useMonthlySummary(year, month);
  const { data: totalTransactions } = useTransactionList({
    filter: {
      type: "all",
      categoryId: null,
      search: "",
      startDate: `${year}-${month.toString().padStart(2, "0")}-01`,
      endDate: endDateStr,
    },
    sort: { key: "date", direction: "desc" },
    page: 1,
    pageSize: 50,
  });

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
        {month}월 요약
      </p>
      <div className="space-y-3">
        <div>
          <p className="text-[10px] text-gray-400">수입</p>
          <p className="text-sm font-bold text-gray-800">
            {monthlySummary.income.toLocaleString()}원
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">지출</p>
          <p className="text-sm font-bold text-gray-800">
            {monthlySummary.expense.toLocaleString()}원
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">거래 수</p>
          <p className="text-sm font-bold text-gray-800">
            {totalTransactions.totalCount}건
          </p>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-[10px] text-gray-400">합계</p>
          <p className="text-sm font-bold text-gray-800">
            {(monthlySummary.income - monthlySummary.expense).toLocaleString()}원
          </p>
        </div>
      </div>
    </div>
  );
}
