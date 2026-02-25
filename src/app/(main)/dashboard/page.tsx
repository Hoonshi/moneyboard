import { ChevronDown } from "lucide-react";
import { DashboardDesktop } from "@/app/(main)/dashboard/_components/dashboardDesktop";

export default function DashboardPage() {
  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div>
          <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
            대시보드
          </h1>
          <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
            2025년 2월 재무 현황
          </p>
        </div>
        <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-200 rounded-md px-2.5 py-1.5 hover:bg-gray-50">
          이번 달 <ChevronDown size={13} className="text-gray-400" />
        </button>
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <DashboardDesktop />
      </div>
    </div>
  );
}
