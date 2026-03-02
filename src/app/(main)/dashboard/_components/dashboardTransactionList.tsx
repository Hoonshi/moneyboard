"use client";

import Link from "next/link";
import { useTransactionList } from "@/hooks/query/useTransactionList";

export default function DashboardTransactionList() {
  //필터 정렬 설정 시 값 보내줘야함
  const { data: transactionList } = useTransactionList();

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
        최근 거래
      </span>
      <div className="mt-2 space-y-1">
        {transactionList.data.map((tx) => (
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
              className={`text-xs font-semibold ${tx.type === "expense" ? "text-[#ff8787]" : "text-[#748ffc]"}`}
            >
              {tx.type === "expense" ? "-" : "+"} {tx.amount.toLocaleString()}원
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
