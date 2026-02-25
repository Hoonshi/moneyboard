"use client";

import { FileText } from "lucide-react";
import { useTransaction } from "@/hooks/query/useTransaction";

interface TransactionDetailProps {
  id: string;
}

export function TransactionDetail({ id }: TransactionDetailProps) {
  const { data } = useTransaction(id);
  const isExpense = data?.type === "expense";

  return (
    <div className="space-y-4 pt-2">
      {/* Amount Card */}
      <div
        className={`${isExpense ? "bg-red-50" : "bg-blue-50"} rounded-2xl p-5 text-center`}
      >
        <p className="text-[11px] text-gray-500">
          {isExpense ? "지출" : "수입"}
        </p>
        <p
          className={`text-2xl font-bold mt-1 ${isExpense ? "text-red-500" : "text-blue-600"}`}
        >
          {isExpense ? "-" : "+"}₩{Math.abs(data?.amount ?? 0).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mt-1">{data?.title}</p>
      </div>

      {/* Info */}
      <div className="bg-white rounded-xl divide-y divide-gray-50">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-xs text-gray-500">날짜</span>
          <span className="text-xs font-medium text-gray-700">
            {data?.date}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-xs text-gray-500">카테고리</span>
          <div className="flex items-center gap-1.5">
            <span>{data?.category?.icon}</span>
            <span className="text-xs font-medium text-gray-700">
              {data?.category?.name}
            </span>
          </div>
        </div>
      </div>

      {/* Memo */}
      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <FileText size={13} className="text-gray-500" />
            <p className="text-xs font-bold text-gray-800">메모</p>
          </div>
          <span className="text-[10px] text-blue-500">수정</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{data?.memo}</p>
      </div>
    </div>
  );
}
