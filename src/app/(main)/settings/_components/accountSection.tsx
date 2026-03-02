"use client";

import { SettingsModal } from "./modals/modalIngredients";
import LogoutModal from "./modals/logoutModal";
import { useAuth } from "@/hooks/useAuth";

export function AccountSection() {
  const { data: user } = useAuth();
  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        계정
      </span>
      <div className="mt-2 space-y-2">
        <div className="border-t border-gray-100 pt-2">
          {user ? (
            <SettingsModal.Root>
              <SettingsModal.Trigger>
                <span className="text-xs text-red-400 cursor-pointer">
                  로그아웃
                </span>
              </SettingsModal.Trigger>
              <SettingsModal.Portal title="로그아웃">
                <LogoutModal />
              </SettingsModal.Portal>
            </SettingsModal.Root>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
