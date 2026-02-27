"use client";

import { useState, useEffect } from "react";
import { SettingsModal } from "./modalIngredients";

interface CategoryFormData {
  name: string;
  icon: string;
  type: "expense" | "income";
  color: string;
}

interface CategoryModalProps {
  initialData?: CategoryFormData & { id: string };
  onSubmit: (data: CategoryFormData) => Promise<void>;
  trigger?: React.ReactNode;
}

const ICON_PRESETS = [
  "🍽",
  "🚗",
  "🏠",
  "🎮",
  "📦",
  "💊",
  "📚",
  "💰",
  "🎁",
  "🔄",
  "✈️",
  "🐶",
];
const COLOR_PRESETS = [
  "#F97316",
  "#22C55E",
  "#3B82F6",
  "#A855F7",
  "#EC4899",
  "#14B8A6",
  "#F59E0B",
  "#6B7280",
];

export function CategoryModal({
  initialData,
  onSubmit,
  trigger,
}: CategoryModalProps) {
  const isEdit = !!initialData;

  const [form, setForm] = useState<CategoryFormData>({
    name: "",
    icon: "🍽",
    type: "expense",
    color: "#F97316",
  });
  const [isLoading, setIsLoading] = useState(false);

  // 수정 모드일 때 초기값 세팅
  useEffect(() => {
    if (initialData) {
      setTimeout(() => {
        setForm({
          name: initialData.name,
          icon: initialData.icon,
          type: initialData.type,
          color: initialData.color,
        });
      }, 0);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!form.name.trim()) return;
    setIsLoading(true);
    await onSubmit(form);
    setIsLoading(false);

    // 추가 모드일 때 폼 초기화
    if (!isEdit) {
      setForm({ name: "", icon: "🍽", type: "expense", color: "#F97316" });
    }
  };

  return (
    <SettingsModal.Root>
      <SettingsModal.Trigger className={isEdit ? "" : ""}>
        {trigger ?? (
          <span className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer">
            {isEdit ? "수정" : "+ 카테고리 추가"}
          </span>
        )}
      </SettingsModal.Trigger>

      <SettingsModal.Portal title={isEdit ? "카테고리 수정" : "카테고리 추가"}>
        <div className="space-y-4">
          {/* 타입 선택 */}
          <SettingsModal.Field label="유형">
            <div className="flex gap-2">
              {(["expense", "income"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setForm((prev) => ({ ...prev, type }))}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border cursor-pointer
                    ${
                      form.type === type
                        ? type === "expense"
                          ? "border-red-400 bg-red-50 text-red-600"
                          : "border-blue-400 bg-blue-50 text-blue-600"
                        : "border-gray-200 text-gray-400 hover:bg-gray-50"
                    }`}
                >
                  {type === "expense" ? "지출" : "수입"}
                </button>
              ))}
            </div>
          </SettingsModal.Field>

          {/* 이름 */}
          <SettingsModal.Field label="카테고리 이름">
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="예: 식비, 교통, 급여..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
          </SettingsModal.Field>

          {/* 아이콘 선택 */}
          <SettingsModal.Field label="아이콘">
            <div className="flex flex-wrap gap-2">
              {ICON_PRESETS.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setForm((prev) => ({ ...prev, icon }))}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-base cursor-pointer
                    ${
                      form.icon === icon
                        ? "bg-blue-50 border-2 border-blue-400"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                    }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </SettingsModal.Field>

          {/* 색상 선택 */}
          <SettingsModal.Field label="색상">
            <div className="flex gap-2">
              {COLOR_PRESETS.map((color) => (
                <button
                  key={color}
                  onClick={() => setForm((prev) => ({ ...prev, color }))}
                  className={`w-7 h-7 rounded-full cursor-pointer ring-offset-2
                    ${form.color === color ? "ring-2 ring-blue-400" : ""}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </SettingsModal.Field>

          {/* 미리보기 */}
          <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
            <span className="text-sm">{form.icon}</span>
            <span className="text-xs font-medium text-gray-700">
              {form.name || "카테고리 이름"}
            </span>
            <div
              className="w-3 h-3 rounded-full ml-auto"
              style={{ backgroundColor: form.color }}
            />
          </div>
        </div>

        <SettingsModal.Footer>
          <SettingsModal.Close className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
            취소
          </SettingsModal.Close>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !form.name.trim()}
            className="flex-1 px-4 py-2 text-sm text-white bg-main rounded-lg
              hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "저장 중..." : isEdit ? "수정" : "추가"}
          </button>
        </SettingsModal.Footer>
      </SettingsModal.Portal>
    </SettingsModal.Root>
  );
}
