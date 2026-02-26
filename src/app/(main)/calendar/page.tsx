import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarContent } from "./_components/calendarContent";

export default function CalendarPage() {
  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div>
          <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
            캘린더
          </h1>
          <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
            날짜별 거래 내역
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ChevronLeft
            size={16}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          />
          <span className="text-xs font-bold text-gray-700">2025.02</span>
          <ChevronRight
            size={16}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          />
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <CalendarContent />
      </div>
    </div>
  );
}
