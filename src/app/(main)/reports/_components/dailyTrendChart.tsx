"use client";

import useFetchDailyTotal from "@/hooks/query/useFetchDailyTotal";
import { DailyTotal } from "@/types/database";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export function DailyTrendChart() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data = [] } = useFetchDailyTotal(year, month);

  const chartData = data.map((item: DailyTotal) => ({
    day: new Date(item.date).getDate(),
    expense: item.expense,
  }));

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
      <p className="text-xs font-bold text-gray-800 mb-3">일별 지출 추이</p>
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barCategoryGap="45%"
            barGap={1}
          >
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white px-2 py-1 border border-gray-100 rounded shadow-sm text-[10px]">
                      <span className="font-medium">
                        {payload[0].value?.toLocaleString()}원
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="expense"
              fill="#f87171"
              radius={[2, 2, 0, 0]}
              maxBarSize={16}
            />

            <XAxis dataKey="day" hide />
            <YAxis hide />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-1.5 px-1">
        <span className="text-[9px] text-gray-400 font-mono">{month}/1</span>
        <span className="text-[9px] text-gray-400 font-mono">{month}/15</span>
        <span className="text-[9px] text-gray-400 font-mono">
          {month}/{new Date(year, month, 0).getDate()}
        </span>
      </div>
    </div>
  );
}
