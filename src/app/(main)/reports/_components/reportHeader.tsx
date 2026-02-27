import { ChevronDown } from "lucide-react";

export default function ReportHeader() {
  return (
    <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
      <div>
        <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
          리포트
        </h1>
        <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
          월간 재무 분석
        </p>
      </div>
      <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-50">
        2025년 2월 <ChevronDown size={13} className="text-gray-400" />
      </button>
    </header>
  );
}
