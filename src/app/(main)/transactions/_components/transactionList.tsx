"use client";

import Link from "next/link";
import type { Transaction } from "@/types/transaction";

type Props = {
  data: Transaction[];
};

export function TransactionList({ data }: Props) {
  return (
    <>
      <div className="lg:hidden space-y-2">
        {data.map((tx) => (
          <Link
            href={`/transactions/${tx.id}`}
            key={tx.id}
            className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 hover:bg-blue-50"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800">{tx.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {tx.category.name}
                {tx.memo ? ` · ${tx.memo}` : ""} · {tx.date}
              </p>
            </div>
            <span
              className={`text-xs font-semibold shrink-0 ${
                tx.type === "expense" ? "text-red-500" : "text-blue-600"
              }`}
            >
              {tx.type === "expense" ? "-" : "+"}
              {tx.amount.toLocaleString()}원
            </span>
          </Link>
        ))}
      </div>

      <div className="hidden lg:block border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-11 gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-medium">
          <span className="col-span-1">날짜</span>
          <span className="col-span-3">내용</span>
          <span className="col-span-2">카테고리</span>
          <span className="col-span-2">메모</span>
          <span className="col-span-2 text-right">금액</span>
        </div>
        {data.map((tx) => (
          <Link
            href={`/transactions/${tx.id}`}
            key={tx.id}
            className="grid grid-cols-11 gap-2 px-3 py-2.5 border-b border-gray-100 last:border-0 text-xs items-center hover:bg-blue-50 cursor-pointer"
          >
            <span className="col-span-1 text-gray-400">{tx.date}</span>
            <span className="col-span-3 font-medium text-gray-700">
              {tx.title}
            </span>
            <span className="col-span-2 text-gray-500">{tx.category.name}</span>
            <span className="col-span-2 text-gray-400 truncate">{tx.memo}</span>
            <span
              className={`col-span-2 text-right font-semibold ${
                tx.type === "expense" ? "text-red-500" : "text-blue-600"
              }`}
            >
              {tx.type === "expense" ? "-" : "+"} {tx.amount.toLocaleString()}원
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
