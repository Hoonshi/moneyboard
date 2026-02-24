"use client";

import { useState } from "react";
import {
  Utensils,
  Car,
  Home,
  Gamepad2,
  Package,
  Pill,
  BookOpen,
  Repeat,
  ChevronDown,
} from "lucide-react";
import type { ElementType } from "react";

const CATEGORIES: { Icon: ElementType; label: string }[] = [
  { Icon: Utensils, label: "식비" },
  { Icon: Car, label: "교통" },
  { Icon: Home, label: "주거" },
  { Icon: Gamepad2, label: "여가" },
  { Icon: Package, label: "쇼핑" },
  { Icon: Pill, label: "의료" },
  { Icon: BookOpen, label: "교육" },
  { Icon: Repeat, label: "구독" },
];

export function TransactionForm() {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [selectedCat, setSelectedCat] = useState(0);

  return (
    <div className="space-y-5 pt-2">
      {/* Type Toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setType("expense")}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-lg transition-colors ${
            type === "expense"
              ? "bg-white text-red-500 shadow-sm"
              : "text-gray-400"
          }`}
        >
          지출
        </button>
        <button
          onClick={() => setType("income")}
          className={`flex-1 py-2.5 text-center text-xs font-medium rounded-lg transition-colors ${
            type === "income"
              ? "bg-white text-blue-500 shadow-sm"
              : "text-gray-400"
          }`}
        >
          수입
        </button>
      </div>

      {/* Amount Display */}
      <div className="text-center py-4">
        <p className="text-[11px] text-gray-400 mb-2">금액</p>
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl text-gray-300 font-light">₩</span>
          <span className="text-3xl font-bold text-gray-800">0</span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="bg-white rounded-xl divide-y divide-gray-50">
        <div className="flex items-center px-4 py-3.5">
          <span className="text-xs text-gray-500 w-16">내용</span>
          <input
            type="text"
            placeholder="예: 스타벅스, 월급..."
            className="text-xs text-gray-700 flex-1 outline-none placeholder:text-gray-300"
          />
        </div>
        <div className="flex items-center px-4 py-3.5">
          <span className="text-xs text-gray-500 w-16">날짜</span>
          <span className="text-xs text-gray-700 flex-1">2025-02-20</span>
          <ChevronDown size={13} className="text-gray-400" />
        </div>
        <div className="px-4 py-3.5">
          <span className="text-xs text-gray-500 block mb-2.5">카테고리</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCat(i)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] border ${
                  selectedCat === i
                    ? "border-blue-400 bg-blue-50 text-blue-600 font-medium"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                <cat.Icon size={11} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
        <div className="px-4 py-3.5">
          <span className="text-xs text-gray-500 block mb-1.5">메모</span>
          <input
            type="text"
            placeholder="메모를 입력하세요..."
            className="text-xs text-gray-700 w-full outline-none placeholder:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
