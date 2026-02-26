"use client";

import Link from "next/link";
import { useTransactionList } from "@/hooks/query/useTransactionList";
import useCategorySummary from "@/hooks/query/useCategorySummary";
import useMonthlySummary from "@/hooks/query/useMonthlySummary";
import type { TransactionListParams } from "@/types/transaction";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CategoryData {
  color: string;
  icon: string;
  id: string;
  name: string;
  percentage: number;
  total: number;
}

export function Dashboard() {
  //임시로 이번달만 체크
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { data: monthlyData } = useMonthlySummary(year, month);
  const { data: categoryData } = useCategorySummary(year, month);

  const transactionData: TransactionListParams = {
    filter: {
      type: "all",
      categoryId: null,
      search: "",
    },
    sort: {
      key: "date",
      direction: "desc",
    },
    page: 1,
    pageSize: 5,
  };
  const { data: transactionList } = useTransactionList(transactionData);
  console.log("categoryData", categoryData);

  return (
    <div className="space-y-4">
      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "이번 달 수입",
            amount: monthlyData?.income || 0,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "이번 달 지출",
            amount: monthlyData?.expense || 0,
            color: "text-red-500",
            bg: "bg-red-50",
          },
          {
            label: "잔액",
            amount: monthlyData?.balance || 0,
            color: "text-green-600",
            bg: "bg-green-50",
          },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} rounded-lg p-3.5`}>
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-lg font-bold mt-1 ${c.color}`}>
              {c.amount.toLocaleString()}원
            </p>
            {/* <p className="text-xs text-gray-400 mt-1">전월 대비 +12%</p> */}
          </div>
        ))}
      </div>
      {/* 차트*/}
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 border border-gray-200 rounded-lg p-3">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            월별 지출 추이
          </span>
          {/* 추후 renderCustomizedLabel 활용해서 퍼센트 표시 */}
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
              >
                {categoryData?.map((item: CategoryData) => (
                  <Cell stroke="none" key={item.id} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* 카테고리 */}
        <div className="col-span-2 border border-gray-200 rounded-lg p-3">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            카테고리별 지출
          </span>
          <div className="mt-3 space-y-2">
            {categoryData?.map((item: CategoryData) => (
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
      {/*
    
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          예산 진행률
        </span>
        <div className="mt-2 grid grid-cols-4 gap-3">
          {BUDGET_PROGRESS.map((b) => {
            const pct = Math.round((b.used / b.total) * 100);
            return (
              <div key={b.cat} className="text-center">
                <p className="text-xs text-gray-500">{b.cat}</p>
                <div className="relative w-12 h-12 mx-auto mt-1">
                  <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={pct > 80 ? "#ef4444" : "#3b82f6"}
                      strokeWidth="3"
                      strokeDasharray={`${(pct / 100) * 88} 88`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {pct}%
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {(b.used / 10000).toFixed(0)}만/{(b.total / 10000).toFixed(0)}
                  만
                </p>
              </div>
            );
          })}
        </div>
      </div>
      */}
      {/*최근거래내역*/}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          최근 거래
        </span>
        <div className="mt-2 space-y-1">
          {transactionList?.data?.map((tx) => (
            <Link
              href={`/transactions/${tx.id}`}
              key={tx.id}
              className="flex items-center gap-3 py-1.5 px-2 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${tx.type === "expense" ? "bg-gray-100" : "bg-blue-50"}`}
              >
                <span
                  className={
                    tx.type === "expense" ? "text-gray-500" : "text-blue-500"
                  }
                >
                  {tx.category.icon}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700">{tx.memo}</p>
                <p className="text-xs text-gray-400">{tx.category.name}</p>
              </div>
              <span
                className={`text-xs font-semibold ${tx.type === "expense" ? "text-red-500" : "text-blue-600"}`}
              >
                {tx.type === "expense" ? "-" : "+"} {tx.amount.toLocaleString()}
                원
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
