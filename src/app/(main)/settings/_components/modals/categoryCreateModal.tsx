"use client";

import { useState } from "react";
import { SettingsModal } from "./modalIngredients";
import { useCreateCategory } from "@/hooks/mutation/useCreateCategory";
import { ICON_PRESETS, COLOR_PRESETS } from "@/constants/categories";
import type { CategoryFormData } from "@/types/categories";
export default function CategoryCreateModal() {
  const [form, setForm] = useState<CategoryFormData>({
    name: "",
    icon: "🍽",
    type: "expense",
    color: "#F97316",
  });
  const { mutate, isPending } = useCreateCategory();

  const { close } = SettingsModal.useSettingsModal();

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    mutate(form, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <>
      <div className="space-y-4">
        <SettingsModal.Field label="추가">
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
        <SettingsModal.Field label="미리보기">
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
        </SettingsModal.Field>
      </div>

      <SettingsModal.Footer>
        <SettingsModal.Close className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
          취소
        </SettingsModal.Close>
        <button
          onClick={handleSubmit}
          disabled={isPending || !form.name.trim()}
          className="flex-1 px-4 py-2 text-sm text-white bg-main rounded-lg
              hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          추가
        </button>
      </SettingsModal.Footer>
    </>
  );
}
