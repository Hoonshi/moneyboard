"use client";

import { User as UserIcon } from "lucide-react";
import { SettingsModal } from "./modals/modalIngredients";
import { ProfileEditModal } from "./modals/profileEditModal";
import { useAuth } from "@/hooks/useAuth";

export function ProfileSection() {
  const { data: user } = useAuth();

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        프로필
      </span>
      <div className="mt-2 flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-500 select-none">
            {user?.user_metadata?.full_name
              ? user.user_metadata.full_name.charAt(0).toUpperCase()
              : user?.email
                ? user.email.charAt(0).toUpperCase()
                : ""}
          </span>{" "}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700">
            {user?.user_metadata.full_name ?? ""}
          </p>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>
        <div className="ml-auto">
          {user ? (
            <SettingsModal.Root>
              <SettingsModal.Trigger>
                <span className="px-3 py-2 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 cursor-pointer">
                  프로필 수정
                </span>
              </SettingsModal.Trigger>
              <SettingsModal.Portal title="프로필 수정">
                <ProfileEditModal />
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
