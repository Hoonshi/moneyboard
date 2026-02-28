"use client";

import { useDateStore } from "@/stores/dateStore";
import useFetchDailyTotal from "@/hooks/query/useFetchDailyTotal";
import { DayPicker } from "react-day-picker";
import { DailyTotal } from "@/types/database";
import { ko } from "date-fns/locale";
import { Utensils } from "lucide-react";

interface CalendarSectionProps {
  selectedDay: Date | undefined;
  onSelect: (day: Date | undefined) => void;
}

export function CalendarSection({
  selectedDay,
  onSelect,
}: CalendarSectionProps) {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);

  const currentMonthView = new Date(year, month - 1);
  const { data: dailyTotal = [] } = useFetchDailyTotal(year, month);

  return (
    <DayPicker
      mode="single"
      locale={ko}
      selected={selectedDay}
      onSelect={onSelect}
      month={currentMonthView}
      classNames={{
        months: "w-full",
        month_grid: "w-full",
        month_caption: "text-center mb-4",
        weekdays: "grid grid-cols-7 mb-2",
        weekday:
          "text-center text-[11px] font-medium py-1 text-gray-400 first:text-red-400 last:text-blue-400",
        weeks: "flex flex-col gap-1",
        week: "grid grid-cols-7 gap-1",
        day: "p-0 flex items-center justify-center",
        nav: "hidden",
      }}
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
                      : dayData.income
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
  );
}
