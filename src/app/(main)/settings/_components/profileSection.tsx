"use client";

import dynamic from "next/dynamic";
import { User as UserIcon } from "lucide-react";
import { SettingsModal } from "./modals/modalIngredients";
import { useAuth } from "@/hooks/useAuth";

const ProfileEditModal = dynamic(
  () =>
    import("./modals/profileEditModal").then((mod) => mod.ProfileEditModal),
);

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
                <span className="cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white lg:rounded-md lg:px-3 lg:py-1.5 lg:text-xs">
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
