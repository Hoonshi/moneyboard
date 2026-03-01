"use client";

import { useState, useEffect, Suspense } from "react";
import { useDateStore } from "@/stores/dateStore";
import { CalendarSection } from "./calendarSection";
import { DayDetailSection } from "./dayDetailSection";
import { MonthlySummarySection } from "./monthlySummarySection";
import { CalendarSectionSkeleton } from "@/components/skeleton/calendarSectionSkeleton";
import { DayDetailSectionSkeleton } from "@/components/skeleton/dayDetailSectionSkeleton";
import { MonthlySummarySectionSkeleton } from "@/components/skeleton/monthlySummarySectionSkeleton";

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
      <Suspense fallback={<CalendarSectionSkeleton />}>
        <CalendarSection selectedDay={selectedDay} onSelect={setSelectedDay} />
      </Suspense>
      <div className="grid grid-cols-3 gap-4">
        <Suspense fallback={<DayDetailSectionSkeleton />}>
          <DayDetailSection selectedDay={selectedDay} />
        </Suspense>
        <Suspense fallback={<MonthlySummarySectionSkeleton />}>
          <MonthlySummarySection />
        </Suspense>
      </div>
    </div>
  );
}
