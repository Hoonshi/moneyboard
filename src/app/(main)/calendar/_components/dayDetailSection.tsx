"use client";

import { useDateStore } from "@/stores/dateStore";
import { useTransactionList } from "@/hooks/query/useTransactionList";
import { Utensils, Car, Wallet } from "lucide-react";

const CAT_ICONS: Record<string, React.ElementType> = {
  식비: Utensils,
  교통: Car,
  급여: Wallet,
};

interface DayDetailSectionProps {
  selectedDay: Date | undefined;
}

export function DayDetailSection({ selectedDay }: DayDetailSectionProps) {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);

  const formattedDate = selectedDay
    ? `${year}-${month.toString().padStart(2, "0")}-${selectedDay.getDate().toString().padStart(2, "0")}`
    : null;

  const { data: transactions } = useTransactionList(
    formattedDate
      ? {
          filter: {
            type: "all",
            categoryId: null,
            search: "",
            startDate: formattedDate,
            endDate: formattedDate,
          },
          sort: { key: "date", direction: "desc" },
          page: 1,
          pageSize: 50,
        }
      : undefined,
  );

  return (
    <div className="col-span-2 border border-gray-200 rounded-lg p-4">
      <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
        {selectedDay
          ? `${selectedDay.getDate()}일 거래 내역`
          : "날짜를 선택하세요"}
      </p>
      {selectedDay ? (
        <div className="space-y-2">
          {transactions.data.map((cur, i) => {
            const Icon = CAT_ICONS[cur.category.icon] ?? Utensils;
            return (
              <div
                key={i}
                className="flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-gray-50"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${cur.type === "income" ? "bg-blue-50" : "bg-gray-100"}`}
                >
                  <Icon
                    size={13}
                    className={
                      cur.type === "income" ? "text-blue-500" : "text-gray-500"
                    }
                  />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700">
                    {cur.title}
                  </p>
                  <p className="text-xs text-gray-400">{cur.category.name}</p>
                </div>
                <span
                  className={`text-xs font-semibold ${cur.type === "income" ? "text-blue-600" : "text-red-500"}`}
                >
                  {cur.amount.toLocaleString()}원
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-gray-400">거래 내역이 없습니다</p>
      )}
    </div>
  );
}
