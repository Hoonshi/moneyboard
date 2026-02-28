"use client";

import { useState, useEffect } from "react";
import { useDateStore } from "@/stores/dateStore";
import { CalendarSection } from "./calendarSection";
import { DayDetailSection } from "./dayDetailSection";
import { MonthlySummarySection } from "./monthlySummarySection";

export function CalendarContent() {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);

  useEffect(() => {
    setTimeout(() => {
      setSelectedDay(new Date(year, month - 1, 1));
    }, 0);
  }, [year, month]);

  return (
    <div className="space-y-4">
      <CalendarSection selectedDay={selectedDay} onSelect={setSelectedDay} />
      <div className="grid grid-cols-3 gap-4">
        <DayDetailSection selectedDay={selectedDay} />
        <MonthlySummarySection />
      </div>
    </div>
  );
}
