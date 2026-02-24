import { Utensils, FileText } from "lucide-react";

interface TransactionDetailProps {
  id: string;
}

const MOCK = {
  type: "expense" as const,
  amount: -6500,
  title: "스타벅스 강남점",
  date: "2025년 2월 20일 (목)",
  category: "식비",
  CategoryIcon: Utensils,
  memo: "아메리카노 아이스 톨 사이즈",
  memoSub: "오후 미팅 전에 커피 한 잔. 다음부터는 텀블러 들고 다녀야지...",
};

export function TransactionDetail({ id }: TransactionDetailProps) {
  const isExpense = MOCK.type === "expense";

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
          {isExpense ? "-" : "+"}₩{Math.abs(MOCK.amount).toLocaleString()}
        </p>
        <p className="text-sm text-gray-600 mt-1">{MOCK.title}</p>
      </div>

      {/* Info */}
      <div className="bg-white rounded-xl divide-y divide-gray-50">
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-xs text-gray-500">날짜</span>
          <span className="text-xs font-medium text-gray-700">{MOCK.date}</span>
        </div>
        <div className="flex items-center justify-between px-4 py-3.5">
          <span className="text-xs text-gray-500">카테고리</span>
          <div className="flex items-center gap-1.5">
            <MOCK.CategoryIcon size={12} className="text-gray-500" />
            <span className="text-xs font-medium text-gray-700">
              {MOCK.category}
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
        <p className="text-xs text-gray-600 leading-relaxed">{MOCK.memo}</p>
        <p className="text-xs text-gray-400 mt-1">{MOCK.memoSub}</p>
      </div>
    </div>
  );
}
