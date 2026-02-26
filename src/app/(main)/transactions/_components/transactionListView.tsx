"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useTransactionList } from "@/hooks/query/useTransactionList";
import type { TransactionFilter, TransactionSort } from "@/types/transaction";
import Link from "next/link";

export function TransactionListView() {
  //현재 페이지 및 한번에 보여줄 데이터 개수
  const [page, setPage] = useState(1);
  const pageSize = 10;

  //필터 및 정렬
  const [filter, setFilter] = useState<TransactionFilter>({
    type: "all",
    categoryId: null,
    // startDate: null,
    // endDate: null,
    search: "",
  });
  const [sort, setSort] = useState<TransactionSort>({
    key: "date",
    direction: "desc",
  });

  //데이터
  const { data, isPending, error } = useTransactionList({
    filter,
    sort,
    page,
    pageSize,
  });

  //페이지 개수 계산
  const pageGroupSize = 10;
  const currentGroup = Math.floor((page - 1) / pageGroupSize);
  const start = currentGroup * pageGroupSize + 1;
  const end = Math.min(start + pageGroupSize - 1, data?.totalPages ?? 0);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // useEffect(() => {
  //   setPage(1);
  // }, [filter, sort]);

  return (
    <div className="space-y-3">
      {/* Filter bar */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-0.5">
          {[
            { label: "전체", type: "all" as const },
            { label: "수입", type: "income" as const },
            { label: "지출", type: "expense" as const },
          ].map(({ label, type }) => (
            <button
              key={type}
              className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer ${
                filter.type === type
                  ? "bg-main text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
              onClick={() => {
                setFilter((prev) => ({
                  ...prev,
                  type: type,
                }));
                setPage(1);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 w-40">
          <Search size={12} className="text-gray-400" />
          <input
            type="text"
            className="text-xs text-gray-400 placeholder-gray-400 focus:ring-0 focus:outline-none w-full"
            placeholder="거래 검색..."
            value={filter.search}
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                search: e.target.value,
              }));
              setPage(1);
            }}
          />
        </div>

        {/* 이후 추가 사항 (필터 및 정렬) */}
        {/* {["카테고리 ▾", "정렬 ▾"].map((btn) => (
          <span
            key={btn}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200"
          >
            {btn}
          </span>
        ))} */}
      </div>

      {/* Mobile: 카드 뷰 */}
      <div className="lg:hidden space-y-2">
        {data?.data?.map((tx) => (
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
              className={`text-xs font-semibold shrink-0 ${tx.type === "expense" ? "text-red-500" : "text-blue-600"}`}
            >
              {tx.type === "expense" ? "-" : "+"}
              {tx.amount.toLocaleString()}원
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop: 테이블 뷰 */}
      <div className="hidden lg:block border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-11 gap-2 px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-medium">
          <span className="col-span-1">날짜</span>
          <span className="col-span-3">내용</span>
          <span className="col-span-2">카테고리</span>
          <span className="col-span-2">메모</span>
          <span className="col-span-2 text-right">금액</span>
          {/* <span className="col-span-2 text-right">잔액</span> */}
        </div>
        {data?.data?.map((tx) => (
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
              className={`col-span-2 text-right font-semibold ${tx.type === "expense" ? "text-red-500" : "text-blue-600"}`}
            >
              {tx.type === "expense" ? "-" : "+"} {tx.amount.toLocaleString()}원
            </span>
            {/* <span className="col-span-2 text-right text-gray-400">-</span> */}
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 pt-1">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer text-gray-500 hover:bg-gray-100"
        >
          ←
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer 
      ${
        page === p
          ? "text-gray-700 font-bold"
          : "text-gray-500 hover:bg-gray-100"
      }`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="w-7 h-7 flex items-center justify-center rounded text-xs cursor-pointer text-gray-500 hover:bg-gray-100"
        >
          →
        </button>
      </div>
    </div>
  );
}
