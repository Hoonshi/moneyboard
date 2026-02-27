"use client";

import { useDeleteCategory } from "@/hooks/mutation/useDeleteCategory";
import { SettingsModal } from "./modalIngredients";

interface DeleteCategory {
  icon: string;
  name: string;
  id: string;
}

export default function CategoryDeleteModal({
  icon,
  name,
  id,
}: DeleteCategory) {
  const { mutate } = useDeleteCategory();
  const { close } = SettingsModal.useSettingsModal();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">
          {icon} {name}
        </span>
        을 삭제하시겠습니까?
      </p>
      <p className="text-xs text-red-400 mt-2">
        이 카테고리에 연결된 거래가 있으면 삭제할 수 없습니다.
      </p>

      <SettingsModal.Footer>
        <SettingsModal.Close className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
          취소
        </SettingsModal.Close>
        <button
          onClick={() => handleDelete()}
          className="flex-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer"
        >
          삭제
        </button>
      </SettingsModal.Footer>
    </>
  );
}
