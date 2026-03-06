import dynamic from "next/dynamic";
import { CategoryRow } from "@/types/database";
import { SettingsModal } from "./modals/modalIngredients";

const CategoryUpdateModal = dynamic(
  () =>
    import("./modals/categoryUpdateModal").then(
      (mod) => mod.CategoryUpdateModal,
    ),
);
const CategoryDeleteModal = dynamic(
  () => import("./modals/categoryDeleteModal"),
);

interface Props {
  category: CategoryRow;
}

export function CategoryItem({ category }: Props) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50">
      <div className="text-gray-400 shrink-0">{category.icon}</div>
      <span className="text-xs font-medium text-gray-700 flex-1">
        {category.name}
      </span>

      <SettingsModal.Root>
        <SettingsModal.Trigger>
          <span className="text-xs text-blue-500 cursor-pointer">수정</span>
        </SettingsModal.Trigger>
        <SettingsModal.Portal title="카테고리 수정">
          <CategoryUpdateModal
            initialData={{
              id: category.id,
              name: category.name,
              icon: category.icon,
              type: category.type,
              color: category.color,
            }}
          />
        </SettingsModal.Portal>
      </SettingsModal.Root>

      <SettingsModal.Root>
        <SettingsModal.Trigger>
          <span className="text-xs text-red-400 cursor-pointer">삭제</span>
        </SettingsModal.Trigger>
        <SettingsModal.Portal title="카테고리 삭제">
          <CategoryDeleteModal
            id={category.id}
            name={category.name}
            icon={category.icon}
          />
        </SettingsModal.Portal>
      </SettingsModal.Root>
    </div>
  );
}
