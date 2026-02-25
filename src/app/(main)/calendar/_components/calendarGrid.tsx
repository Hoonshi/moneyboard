'use client';

import { useState } from 'react';
import { CalendarCell } from './calendar-cell';
import { DayDetail } from './day-detail';

const DAY_HEADERS = ['일', '월', '화', '수', '목', '금', '토'];

// Values in 만(10000) for compact display
const DAY_DATA: Record<number, { income?: number; expense?: number }> = {
  3:  { expense: 15 },
  5:  { expense: 32 },
  7:  { expense: 8  },
  10: { expense: 45 },
  12: { expense: 6  },
  15: { income: 320 },
  17: { expense: 23 },
  18: { expense: 32 },
  19: { expense: 29 },
  20: { expense: 6  },
};

export function CalendarGrid() {
  const [selectedDay, setSelectedDay] = useState<number | null>(20);
  const days = Array.from({ length: 28 }, (_, i) => i + 1);
  // Feb 2025 starts on Saturday → 6 empty cells
  const emptyCount = 6;

  return (
    <>
      {/* Calendar Card */}
      <div className="bg-white rounded-xl p-3">
        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {DAY_HEADERS.map((d) => (
            <div
              key={d}
              className={`text-center text-[10px] font-medium py-1 ${
                d === '일' ? 'text-red-400' : d === '토' ? 'text-blue-400' : 'text-gray-400'
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: emptyCount }).map((_, i) => (
            <div key={`e-${i}`} className="h-11" />
          ))}
          {days.map((day) => (
            <CalendarCell
              key={day}
              day={day}
              isToday={day === 20}
              data={DAY_DATA[day]}
              onClick={() => setSelectedDay(day)}
            />
          ))}
        </div>
      </div>

      {/* Day detail */}
      {selectedDay && <DayDetail day={selectedDay} />}

      {/* Monthly Summary */}
      <div className="bg-white rounded-xl p-4">
        <p className="text-xs font-bold text-gray-800 mb-2">2월 요약</p>
        <div className="flex justify-between">
          <div>
            <p className="text-[10px] text-gray-400">수입</p>
            <p className="text-xs font-bold text-blue-600">₩3,200,000</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">지출</p>
            <p className="text-xs font-bold text-red-500">₩1,847,000</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">거래 수</p>
            <p className="text-xs font-bold text-gray-700">47건</p>
          </div>
        </div>
      </div>
    </>
  );
}
