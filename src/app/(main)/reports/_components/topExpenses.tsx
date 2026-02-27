"use client";

import { useTransactionList } from "@/hooks/query/useTransactionList";
import { TransactionListParams } from "@/types/transaction";

const TOP_EXPENSES = [
  { rank: 1, name: "월세", amount: "₩450,000", cat: "주거" },
  { rank: 2, name: "마트 장보기", amount: "₩120,000", cat: "식비" },
  { rank: 3, name: "통신비", amount: "₩65,000", cat: "공과금" },
  { rank: 4, name: "병원 진료", amount: "₩45,000", cat: "의료" },
  { rank: 5, name: "쿠팡", amount: "₩32,000", cat: "쇼핑" },
];

export function TopExpenses() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

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

  const expenseData = data?.data
    ?.filter((cur) => cur.type === "expense")
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
          {expenseData?.map((item, idx) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
            >
              <span className="text-xs font-bold text-gray-300 w-4">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700">{item.memo}</p>
                <p className="text-[10px] text-gray-400">
                  {item.category.name}
                </p>
              </div>
              <span className="text-xs font-semibold text-red-500">
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
