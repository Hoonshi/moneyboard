"use client";

import { useRouter } from "next/navigation";
import { useDeleteTransaction } from "@/hooks/mutation/useDeleteTransaction";
import { SettingsModal } from "@/app/(main)/settings/_components/modals/modalIngredients";

export default function TransactionDeleteModal({ id }: { id: string }) {
  const router = useRouter();
  const { mutate: mutateDelete } = useDeleteTransaction();
  const { close } = SettingsModal.useSettingsModal();

  const handleDelete = () => {
    mutateDelete(id, {
      onSuccess: () => {
        close();
        router.push("/transactions");
      },
    });
  };

  return (
    <>
      <p className="text-sm text-gray-600">정말 이 거래를 삭제하시겠습니까?</p>
      <SettingsModal.Footer>
        <SettingsModal.Close className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
          취소
        </SettingsModal.Close>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer"
        >
          삭제
        </button>
      </SettingsModal.Footer>
    </>
  );
}
