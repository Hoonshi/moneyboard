"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useCreateTransaction } from "@/hooks/mutation/useCreateTransaction";
import { useUpdateTransaction } from "@/hooks/mutation/useUpdateTransaction";
import { useCategories } from "@/hooks/query/useCategories";

interface TransactionFormProps {
  initialValues?: {
    type: "expense" | "income";
    amount: number;
    title: string;
    date: string;
    memo?: string;
    category_id: string;
  };
  transactionId?: string;
}

export function TransactionForm({
  initialValues,
  transactionId,
}: TransactionFormProps = {}) {
  const router = useRouter();
  const [type, setType] = useState<"expense" | "income">(
    initialValues?.type ?? "expense",
  );
  const [amount, setAmount] = useState(initialValues?.amount ?? "");
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [date, setDate] = useState(initialValues?.date ?? "");
  const [memo, setMemo] = useState(initialValues?.memo ?? "");

  //db에 저장한 카테고리 불러오기
  const { data: categories } = useCategories(type);
  const [selectedCat, setSelectedCat] = useState<string>(
    initialValues?.category_id ?? "",
  );
  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  //에러 검증 함수
  const validate = () => {
    const newErrors = {
      title: title ? "" : "내용을 입력해주세요.",
      amount: amount ? "" : "금액을 입력해주세요.",
      date: date ? "" : "날짜를 입력해주세요.",
      category: selectedCat ? "" : "카테고리를 선택해주세요.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).some((value) => value !== "");
  };

  const { mutate: mutateCreate } = useCreateTransaction({
    formReset: () => {
      setType("expense");
      setAmount("");
      setTitle("");
      setDate("");
      setMemo("");
      setSelectedCat("");
    },
  });
  const { mutate: mutateUpdate } = useUpdateTransaction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasError = validate();
    if (hasError) return;

    const payload = {
      type,
      amount: Number(amount),
      title,
      date,
      memo,
      category_id: selectedCat,
    };

    if (transactionId) {
      mutateUpdate(
        { id: transactionId, ...payload },
        { onSuccess: () => router.back() },
      );
    } else {
      mutateCreate(payload);
    }
  };

  return (
    <form
      id="transaction-form"
      onSubmit={handleSubmit}
      className="space-y-5 pt-2"
    >
      {/* Type Toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          type="button"
          onClick={() => {
            setType("expense");
            setSelectedCat("");
          }}
          className={`cursor-pointer flex-1 py-2.5 text-center text-xs font-bold rounded-lg transition-colors ${
            type === "expense"
              ? "bg-white text-red-500 shadow-sm"
              : "text-gray-400"
          }`}
        >
          지출
        </button>
        <button
          type="button"
          onClick={() => {
            setType("income");
            setSelectedCat("");
          }}
          className={`cursor-pointer flex-1 py-2.5 text-center text-xs font-medium rounded-lg transition-colors ${
            type === "income"
              ? "bg-white text-blue-500 shadow-sm"
              : "text-gray-400"
          }`}
        >
          수입
        </button>
      </div>

      {/* 금액 */}
      <div className="text-center py-4">
        <label className="text-[11px] text-gray-400 mb-2">금액</label>
        <div className="flex items-center justify-center gap-1">
          <span className="text-2xl text-gray-300 font-light">₩</span>
          <input
            type="number"
            name="amount"
            className="text-3xl font-bold text-gray-800 w-46 text-center outline-none"
            placeholder="0"
            //제어 컴포넌트
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {errors.amount && (
          <p className="text-[10px] text-red-500 mt-1 ml-16">{errors.amount}</p>
        )}
      </div>

      <div className="bg-white rounded-xl divide-y divide-gray-50">
        {/* 내용 */}
        <div className="flex items-center px-4 py-3.5">
          <span className="text-xs text-gray-500 w-16">내용</span>
          <input
            type="text"
            name="title"
            placeholder="예: 스타벅스, 월급..."
            className="text-xs text-gray-700 flex-1 outline-none placeholder:text-gray-300"
            //제어 컴포넌트
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-[10px] text-red-500 mt-1 ml-16">
              {errors.title}
            </p>
          )}
        </div>
        {/* 날짜 */}
        <div className="flex items-center px-4 py-3.5">
          <span className="text-xs text-gray-500 w-16">날짜</span>
          <input
            type="date"
            name="date"
            className="text-xs text-gray-700 flex-1 outline-none"
            //제어 컴포넌트
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <ChevronDown size={13} className="text-gray-400" />
          {errors.date && (
            <p className="text-[10px] text-red-500 mt-1 ml-16">{errors.date}</p>
          )}
        </div>
        {/* 카테고리 */}
        <div className="px-4 py-3.5">
          <span className="text-xs text-gray-500 block mb-2.5">카테고리</span>
          <div className="flex flex-wrap gap-2">
            {categories?.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] border ${
                  selectedCat === cat.id
                    ? "border-blue-400 bg-blue-50 text-blue-600 font-medium"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="text-[10px] text-red-500 mt-1 ml-16">
              {errors.category}
            </p>
          )}
        </div>
        {/* 메모 */}
        <div className="px-4 py-3.5">
          <span className="text-xs text-gray-500 block mb-1.5">메모</span>
          <input
            type="text"
            placeholder="메모를 입력하세요..."
            className="text-xs text-gray-700 w-full outline-none placeholder:text-gray-300"
            //제어 컴포넌트
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}
