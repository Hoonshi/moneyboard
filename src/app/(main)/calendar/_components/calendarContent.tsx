"use client";

import { useState } from "react";
import { Utensils, Car, Wallet } from "lucide-react";
import { DayPicker } from "react-day-picker";
import useFetchDailyTotal from "@/hooks/query/useFetchDailyTotal";
import { DailyTotal } from "@/types/database";
import { useTransactionList } from "@/hooks/query/useTransactionList";
import useMonthlySummary from "@/hooks/query/useMonthlySummary";
import { ko } from "date-fns/locale";

const CAT_ICONS: Record<string, React.ElementType> = {
  식비: Utensils,
  교통: Car,
  급여: Wallet,
};

export function CalendarContent() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  // 캘린더용
  const { data: dailyTotal = [] } = useFetchDailyTotal(year, month);
  console.log("dailyTotal", dailyTotal);
  // 거래 내역용
  const formattedDate = selectedDay
    ? `${year}-${month.toString().padStart(2, "0")}-${selectedDay.getDate().toString().padStart(2, "0")}`
    : `${year}-${month.toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  const { data: transactions } = useTransactionList({
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
  });
  //월별 요약용
  const { data: monthlySummary } = useMonthlySummary(year, month);
  const { data: totalTransactions } = useTransactionList({
    filter: {
      type: "all",
      categoryId: null,
      search: "",
      startDate: `${year}-${month.toString().padStart(2, "0")}-01`,
      endDate: `${year}-${month.toString().padStart(2, "0")}-31`,
    },
    sort: { key: "date", direction: "desc" },
    page: 1,
    pageSize: 50,
  });
  console.log("monthlySummary", monthlySummary);

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <DayPicker
        mode="single"
        locale={ko}
        selected={selectedDay}
        onSelect={setSelectedDay}
        classNames={{
          months: "w-full",
          // table 태그
          month_grid: "w-full",
          month_caption: "text-center mb-4",

          // 1. 헤더 레이아웃 (주)
          weekdays: "grid grid-cols-7 mb-2",
          weekday:
            "text-center text-[11px] font-medium py-1 text-gray-400 first:text-red-400 last:text-blue-400",

          // 2. 날짜 레이아웃
          weeks: "flex flex-col gap-1", // 주들을 아래로 나열
          week: "grid grid-cols-7 gap-1", // 각 주를 헤더 레이아웃에 맞춤
          day: "p-0 flex items-center justify-center",
          nav: "hidden",
        }}
        //날짜 버튼
        components={{
          DayButton: (props) => {
            const { day, modifiers } = props;
            const date = day.date;
            const dayNum = date.getDate();
            const dayData = dailyTotal.find(
              (d: DailyTotal) => new Date(d.date).getDate() === dayNum,
            );
            const isToday = modifiers.today;
            const isSelected = modifiers.selected;
            return (
              <button
                {...props}
                className={`cursor-pointer h-16 w-full flex flex-col items-center justify-center transition-colors border rounded-lg ${
                  isToday
                    ? "bg-main text-white border-main"
                    : isSelected
                      ? "border-blue-300 bg-blue-50 text-gray-700"
                      : "border-transparent hover:bg-gray-50 text-gray-700"
                }`}
              >
                <span className={`text-xs ${isToday ? "font-bold" : ""}`}>
                  {dayNum}
                </span>
                {dayData && (
                  <span
                    className={`text-[9px] font-medium mt-0.5 ${
                      isToday
                        ? "text-blue-100"
                        : dayData.income.toLocaleString()
                          ? "text-blue-500"
                          : "text-red-400"
                    }`}
                  >
                    {dayData.income
                      ? `+${dayData.income.toLocaleString()}원`
                      : `-${dayData.expense.toLocaleString()}원`}
                  </span>
                )}
              </button>
            );
          },
        }}
      />

      {/* Day detail + Monthly summary */}
      <div className="grid grid-cols-3 gap-4">
        {/* Day detail */}
        <div className="col-span-2 border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
            {selectedDay
              ? `${selectedDay.getDate()}일 거래 내역`
              : "날짜를 선택하세요"}
          </p>
          {selectedDay ? (
            <div className="space-y-2">
              {transactions?.data?.map((cur, i) => {
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
                          cur.type === "income"
                            ? "text-blue-500"
                            : "text-gray-500"
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">
                        {cur.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {cur.category.name}
                      </p>
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

        {/* Monthly summary */}
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
            2월 요약
          </p>
          <div className="space-y-3">
            <div>
              <p className="text-[10px] text-gray-400">수입</p>
              <p className="text-sm font-bold text-blue-600">
                {monthlySummary?.income.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">지출</p>
              <p className="text-sm font-bold text-red-500">
                {monthlySummary?.expense.toLocaleString()}원
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">거래 수</p>
              <p className="text-sm font-bold text-gray-700">
                {totalTransactions?.totalCount || 0}건
              </p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">합계</p>
              <p className="text-sm font-bold text-green-600">
                {monthlySummary &&
                  (
                    monthlySummary.income - monthlySummary.expense
                  ).toLocaleString()}
                원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
