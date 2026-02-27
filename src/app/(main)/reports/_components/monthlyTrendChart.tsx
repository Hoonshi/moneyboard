"use client";

import useFetchMonthlyTrend from "@/hooks/query/useFetchMonthlyTrend";
import { MonthlyTrendType } from "@/types/database";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyTrendChart() {
  const { data } = useFetchMonthlyTrend(6);

  //x축에 날짜표시하려고쓴 변수
  const chartData = data?.map((item: MonthlyTrendType) => ({
    ...item,
    name: `${item.year}.${item.month}`,
  }));

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-3">
        월별 추이
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            style={{ pointerEvents: "none" }}
            barCategoryGap="45%"
            barGap={2}
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 15,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis
              width={60}
              tickFormatter={(v) => `${v?.toLocaleString()}원`}
              tick={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: "13px" }} />
            <Bar
              name="수입"
              dataKey="income"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />
            <Bar
              name="지출"
              dataKey="expense"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
              maxBarSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// BarChart의 경우 data에 해당 데이터를 주고 key를 이용하는 방식!
