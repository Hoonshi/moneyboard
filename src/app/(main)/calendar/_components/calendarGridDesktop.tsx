"use client";

import { useState } from "react";
import { Utensils, Car, Wallet } from "lucide-react";

const DAY_HEADERS = ["일", "월", "화", "수", "목", "금", "토"];

const DAY_DATA: Record<number, { income?: number; expense?: number }> = {
  3: { expense: 15 },
  5: { expense: 32 },
  7: { expense: 8 },
  10: { expense: 45 },
  12: { expense: 6 },
  15: { income: 320 },
  17: { expense: 23 },
  18: { expense: 32 },
  19: { expense: 29 },
  20: { expense: 6 },
};

const DAY_DETAIL: Record<
  number,
  { name: string; cat: string; amount: string; neg: boolean }[]
> = {
  20: [
    { name: "스타벅스", cat: "식비", amount: "-₩6,500", neg: true },
    { name: "편의점", cat: "식비", amount: "-₩3,200", neg: true },
    { name: "카카오택시", cat: "교통", amount: "-₩8,500", neg: true },
  ],
  15: [{ name: "월급", cat: "급여", amount: "+₩3,200,000", neg: false }],
};

const CAT_ICONS: Record<string, React.ElementType> = {
  식비: Utensils,
  교통: Car,
  급여: Wallet,
};

export function CalendarGridDesktop() {
  const [selectedDay, setSelectedDay] = useState<number | null>(20);
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  const emptyCount = 6;

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAY_HEADERS.map((d) => (
            <div
              key={d}
              className={`text-center text-[11px] font-medium py-1 ${
                d === "일"
                  ? "text-red-400"
                  : d === "토"
                    ? "text-blue-400"
                    : "text-gray-400"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: emptyCount }).map((_, i) => (
            <div key={`e-${i}`} className="h-16" />
          ))}
          {days.map((day) => {
            const data = DAY_DATA[day];
            const isToday = day === 20;
            const isSelected = day === selectedDay;
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-16 rounded-lg flex flex-col items-center justify-center cursor-pointer border transition-colors ${
                  isToday
                    ? "bg-main text-white border-blue-500"
                    : isSelected
                      ? "border-blue-300 bg-blue-50"
                      : "border-transparent hover:bg-gray-50"
                }`}
              >
                <span
                  className={`text-xs ${isToday ? "font-bold" : "text-gray-700"}`}
                >
                  {day}
                </span>
                {data && (
                  <span
                    className={`text-[9px] font-medium mt-0.5 ${
                      isToday
                        ? "text-blue-100"
                        : data.income
                          ? "text-blue-500"
                          : "text-red-400"
                    }`}
                  >
                    {data.income ? `+${data.income}만` : `-${data.expense}만`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day detail + Monthly summary */}
      <div className="grid grid-cols-3 gap-4">
        {/* Day detail */}
        <div className="col-span-2 border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
            {selectedDay ? `${selectedDay}일 거래 내역` : "날짜를 선택하세요"}
          </p>
          {selectedDay && DAY_DETAIL[selectedDay] ? (
            <div className="space-y-2">
              {DAY_DETAIL[selectedDay].map((tx, i) => {
                const Icon = CAT_ICONS[tx.cat] ?? Utensils;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-gray-50"
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${tx.neg ? "bg-gray-100" : "bg-blue-50"}`}
                    >
                      <Icon
                        size={13}
                        className={tx.neg ? "text-gray-500" : "text-blue-500"}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-700">
                        {tx.name}
                      </p>
                      <p className="text-xs text-gray-400">{tx.cat}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold ${tx.neg ? "text-red-500" : "text-blue-600"}`}
                    >
                      {tx.amount}
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
              <p className="text-sm font-bold text-blue-600">₩3,200,000</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">지출</p>
              <p className="text-sm font-bold text-red-500">₩1,847,000</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">거래 수</p>
              <p className="text-sm font-bold text-gray-700">47건</p>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">순이익</p>
              <p className="text-sm font-bold text-green-600">₩1,353,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
