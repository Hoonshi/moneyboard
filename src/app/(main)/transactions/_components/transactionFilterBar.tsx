"use client";

import { Search, CalendarDays } from "lucide-react";
import type { TransactionFilter } from "@/types/transaction";

type Props = {
  filter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
};

export function TransactionFilterBar({ filter, onFilterChange }: Props) {
  return (
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
            onClick={() => onFilterChange({ ...filter, type })}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="flex-1" />
      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5">
        <CalendarDays size={12} className="text-gray-400 shrink-0" />
        <input
          type="month"
          className="text-xs text-gray-500 focus:ring-0 focus:outline-none bg-transparent cursor-pointer"
          value={filter.startDate ? filter.startDate.slice(0, 7) : ""}
          onChange={(e) => {
            if (!e.target.value) {
              onFilterChange({ ...filter, startDate: null, endDate: null });
              return;
            }
            const [year, month] = e.target.value.split("-").map(Number);
            const lastDay = new Date(year, month, 0).getDate();
            onFilterChange({
              ...filter,
              startDate: `${e.target.value}-01`,
              endDate: `${e.target.value}-${String(lastDay).padStart(2, "0")}`,
            });
          }}
        />
      </div>
      <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1.5 w-40">
        <Search size={12} className="text-gray-400" />
        <input
          type="text"
          className="text-xs text-gray-400 placeholder-gray-400 focus:ring-0 focus:outline-none w-full"
          placeholder="거래 검색..."
          value={filter.search}
          onChange={(e) =>
            onFilterChange({ ...filter, search: e.target.value })
          }
        />
      </div>
    </div>
  );
}
