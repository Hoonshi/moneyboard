import { Plus } from "lucide-react";
import { BudgetDesktop } from "./_components/budget-desktop";

export default function BudgetPage() {
  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div>
          <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
            예산 관리
          </h1>
          <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
            2025년 2월 카테고리별 예산
          </p>
        </div>
        <button className="flex items-center gap-1 text-xs text-white bg-main rounded-md px-3 py-1.5 hover:bg-blue-600">
          <Plus size={13} strokeWidth={2.5} /> 예산 추가
        </button>
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <BudgetDesktop />
      </div>
    </div>
  );
}
