"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import useCategorySummary from "@/hooks/query/useCategorySummary";
import { useDateStore } from "@/stores/dateStore";

interface CategoryData {
  color: string;
  icon: string;
  id: string;
  name: string;
  percentage: number;
  total: number;
}

export default function DashboardChart() {
  const year = useDateStore((state) => state.year);
  const month = useDateStore((state) => state.month);
  const { data: categoryData } = useCategorySummary(year, month);

  return (
    <div className="grid lg:grid-cols-5 gap-3 grid-cols-1">
      <div className="col-span-3 border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          월별 지출 추이
        </span>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart style={{ pointerEvents: "none" }}>
            <Pie
              data={categoryData}
              dataKey="total"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              labelLine={false}
              label={({ percent, name }) =>
                `${name} ${((percent || 0) * 100).toFixed(0)}%`
              }
              fontSize={12}
            >
              {categoryData.map((item: CategoryData) => (
                <Cell stroke="none" key={item.id} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="col-span-2 border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          카테고리별 지출
        </span>
        <div className="mt-3 space-y-2">
          {categoryData.map((item: CategoryData) => (
            <div key={item.id} className="flex items-center gap-2">
              <span className="text-xs w-14 text-gray-600">{item.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 w-7">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
