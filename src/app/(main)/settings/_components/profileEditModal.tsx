"use client";

import { useState } from "react";
import { SettingsModal } from "./modalIngredients";
import { useAuth, useUpdateProfile } from "@/hooks/useAuth";

export function ProfileEditModal() {
  const { data: user } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name ?? "");

  const { mutate, isPending } = useUpdateProfile();

  const { close } = SettingsModal.useSettingsModal();

  const handleSave = async () => {
    if (!name.trim()) return;
    mutate(name, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <>
      <div className="space-y-4">
        <SettingsModal.Field label="이름">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
          />
        </SettingsModal.Field>
      </div>

      <SettingsModal.Footer>
        <SettingsModal.Close className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
          취소
        </SettingsModal.Close>
        <button
          onClick={handleSave}
          disabled={isPending || !name.trim()}
          className="flex-1 px-4 py-2 text-sm text-white bg-main rounded-lg
              hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {isPending ? "저장 중..." : "저장"}
        </button>
      </SettingsModal.Footer>
    </>
  );
}
