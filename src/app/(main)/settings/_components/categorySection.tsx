"use client";

import dynamic from "next/dynamic";
import { CategoryRow } from "@/types/database";
import { SettingsModal } from "./modals/modalIngredients";
import { CategoryItem } from "./categoryItem";
import { useCategories } from "@/hooks/query/useCategories";
import { useAuth } from "@/hooks/useAuth";

const CategoryCreateModal = dynamic(
  () =>
    import("./modals/categoryCreateModal").then(
      (mod) => mod.CategoryCreateModal,
    ),
);

export function CategorySection() {
  const { data: categoryData } = useCategories();
  const { data: user } = useAuth();

  return (
    <div className="border border-gray-200 rounded-lg p-3">
      <span className="text-xs font-semibold text-gray-500  uppercase tracking-wider">
        카테고리 관리
      </span>
      <div className="mt-2 space-y-1.5">
        {categoryData?.map((category: CategoryRow) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
      <div className="mt-2 flex justify-end">
        {user ? (
          <SettingsModal.Root>
            <SettingsModal.Trigger>
              <div className="text-xs text-white bg-main rounded-md px-3 py-1.5 hover:bg-blue-600 cursor-pointer">
                + 카테고리 추가
              </div>
            </SettingsModal.Trigger>
            <SettingsModal.Portal title="카테고리 추가">
              <CategoryCreateModal />
            </SettingsModal.Portal>
          </SettingsModal.Root>
        ) : null}
      </div>
    </div>
  );
}
