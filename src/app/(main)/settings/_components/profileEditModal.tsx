"use client";

import { useState } from "react";
import { SettingsModal } from "./modalIngredients";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export function ProfileEditModal() {
  const { data: user } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setIsLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name.trim() },
    });

    setIsLoading(false);

    if (!error) {
      console.error("프로필 변경에 실패했습니다");
    }
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
          disabled={isLoading || !name.trim()}
          className="flex-1 px-4 py-2 text-sm text-white bg-main rounded-lg
              hover:opacity-90 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "저장 중..." : "저장"}
        </button>
      </SettingsModal.Footer>
    </>
  );
}
