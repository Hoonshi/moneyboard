"use client";

import { useTransactionList } from "@/hooks/query/useTransactionList";
import { TransactionListParams } from "@/types/transaction";
import { useDateStore } from "@/stores/dateStore";

export function TopExpenses() {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);

  // 1. 해당 월의 시작일 (2026-02-01)
  const startDay = "01";
  const startDateStr = `${year}-${String(month).padStart(2, "0")}-${startDay}`;

  // 2. 해당 월의 마지막 날 (2026-02-28)
  const lastDay = new Date(year, month, 0).getDate();
  const endDateStr = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  const transactionData: TransactionListParams = {
    filter: {
      type: "all",
      categoryId: null,
      startDate: startDateStr,
      endDate: endDateStr,
      search: "",
    },
    sort: {
      key: "date",
      direction: "desc",
    },
    page: 1,
    pageSize: 5,
  };
  const { data } = useTransactionList(transactionData);

  const expenseData = data.data
    .filter((cur) => cur.type === "expense")
    .sort((a, b) => {
      return b.amount - a.amount;
    });

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="bg-white rounded-xl p-4">
        <p className="text-xs font-bold text-gray-800 mb-3">
          가장 큰 지출 TOP 5
        </p>
        <div className="space-y-1">
          {expenseData.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-md font-bold text-gray-300 w-4">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{item.memo}</p>
                <p className="text-[10px] text-gray-400">
                  {item.category.name}
                </p>
              </div>
              <span className="text-md font-semibold text-[#ff8787]">
                {item.amount.toLocaleString()}원
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
