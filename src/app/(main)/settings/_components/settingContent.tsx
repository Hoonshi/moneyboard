"use client";

import { useCategories } from "@/hooks/query/useCategories";
import { useAuth } from "@/hooks/useAuth";
import { CategoryRow } from "@/types/database";
import { User } from "lucide-react";
import { SettingsModal } from "./modalIngredients";
import { ProfileEditModal } from "./profileEditModal";
import { CategoryCreateModal } from "./categoryCreateModal";
import { CategoryUpdateModal } from "./categoryUpdateModal";
import CategoryDeleteModal from "./categoryDeleteModal";
import LogoutModal from "./logoutModal";

export function SettingContent() {
  const { data: userData } = useAuth();
  console.log("유저데이터", userData);
  const { data: categoryData } = useCategories();
  console.log("카테고리데이터", categoryData);

  return (
    <div className="max-w-lg space-y-5">
      {/* Profile */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          프로필
        </span>
        <div className="mt-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {userData?.user_metadata.full_name ?? ""}
            </p>
            <p className="text-xs text-gray-400">{userData?.email}</p>
          </div>
          <div className="ml-auto">
            <SettingsModal.Root>
              <SettingsModal.Trigger>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 cursor-pointer">
                  프로필 수정
                </span>
              </SettingsModal.Trigger>
              <SettingsModal.Portal title="프로필 수정">
                <ProfileEditModal />
              </SettingsModal.Portal>
            </SettingsModal.Root>
          </div>
        </div>
      </div>

      {/* Category Management */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          카테고리 관리
        </span>
        <div className="mt-2 space-y-1.5">
          {categoryData?.map((cur: CategoryRow) => (
            <div
              key={cur.id}
              className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50"
            >
              {/* <cat.Icon size={14} className="text-gray-400 shrink-0" /> */}
              <div className="text-gray-400 shrink-0">{cur.icon}</div>
              <span className="text-xs font-medium text-gray-700 flex-1">
                {cur.name}
              </span>
              <SettingsModal.Root>
                <SettingsModal.Trigger>
                  <span className="text-xs text-blue-500 cursor-pointer">
                    수정
                  </span>
                </SettingsModal.Trigger>
                <SettingsModal.Portal title="카테고리 수정">
                  <CategoryUpdateModal
                    initialData={{
                      id: cur.id,
                      name: cur.name,
                      icon: cur.icon,
                      type: cur.type,
                      color: cur.color,
                    }}
                  />
                </SettingsModal.Portal>
              </SettingsModal.Root>

              <SettingsModal.Root>
                <SettingsModal.Trigger>
                  <span className="text-xs text-red-400 cursor-pointer">
                    삭제
                  </span>
                </SettingsModal.Trigger>
                <SettingsModal.Portal title="카테고리 삭제">
                  <CategoryDeleteModal
                    id={cur.id}
                    name={cur.name}
                    icon={cur.icon}
                  />
                </SettingsModal.Portal>
              </SettingsModal.Root>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <SettingsModal.Root>
            <SettingsModal.Trigger>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white cursor-pointer">
                + 카테고리 추가
              </span>
            </SettingsModal.Trigger>
            <SettingsModal.Portal title="카테고리 추가">
              <CategoryCreateModal />
            </SettingsModal.Portal>
          </SettingsModal.Root>
        </div>
      </div>

      {/* Account */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          계정
        </span>
        <div className="mt-2 space-y-2">
          {/* <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Moon size={14} className="text-gray-400" />
              <span className="text-xs text-gray-600">다크 모드</span>
            </div>
            <div className="w-8 h-4 bg-gray-200 rounded-full relative">
              <div className="w-3.5 h-3.5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
            </div>
          </div> */}
          <div className="border-t border-gray-100 pt-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
