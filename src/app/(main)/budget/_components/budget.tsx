"use client";

import useBudget from "@/hooks/query/useBudget";
import { AlertTriangle } from "lucide-react";
import { Utensils, Home, Car, Gamepad2, Package, Pill } from "lucide-react";
import type { ElementType } from "react";

const BUDGETS: {
  Icon: ElementType;
  cat: string;
  used: number;
  total: number;
  color: string;
}[] = [
  {
    Icon: Utensils,
    cat: "식비",
    used: 420000,
    total: 500000,
    color: "bg-orange-400",
  },
  {
    Icon: Home,
    cat: "주거/공과금",
    used: 450000,
    total: 500000,
    color: "bg-blue-400",
  },
  { Icon: Car, cat: "교통", used: 85000, total: 100000, color: "bg-green-400" },
  {
    Icon: Gamepad2,
    cat: "여가/문화",
    used: 180000,
    total: 200000,
    color: "bg-purple-400",
  },
  {
    Icon: Package,
    cat: "쇼핑",
    used: 95000,
    total: 300000,
    color: "bg-pink-400",
  },
  {
    Icon: Pill,
    cat: "의료/건강",
    used: 0,
    total: 100000,
    color: "bg-teal-400",
  },
];

export function BudgetDesktop() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data } = useBudget(year, month);
  console.log(data);

  return (
    <div className="space-y-4">
      {/* Summary bar */}
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">이번 달 총 예산</p>
          <p className="text-lg font-bold text-gray-800">₩2,000,000</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">사용 금액</p>
          <p className="text-lg font-bold text-red-500">₩1,230,000</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">남은 금액</p>
          <p className="text-lg font-bold text-green-600">₩770,000</p>
        </div>
        <div className="w-32">
          <div className="text-center text-xs text-gray-500 mb-1">61.5%</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-orange-400 h-2.5 rounded-full"
              style={{ width: "61.5%" }}
            />
          </div>
        </div>
      </div>

      {/* Budget list */}
      <div className="space-y-2.5">
        {BUDGETS.map((b) => {
          const pct = Math.round((b.used / b.total) * 100);
          const isOver = pct > 80;
          return (
            <div
              key={b.cat}
              className="border border-gray-200 rounded-lg p-3 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                    <b.Icon size={14} className="text-gray-500" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    {b.cat}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    ₩{(b.used / 10000).toFixed(0)}만 / ₩
                    {(b.total / 10000).toFixed(0)}만
                  </span>
                  <span
                    className={`text-xs font-bold ${isOver ? "text-red-500" : "text-gray-600"}`}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`${isOver ? "bg-red-400" : b.color} h-2 rounded-full`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              {isOver && (
                <div className="flex items-center gap-1 mt-1.5">
                  <AlertTriangle size={11} className="text-red-400" />
                  <p className="text-xs text-red-400">
                    예산의 {pct}%를 사용했어요
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
