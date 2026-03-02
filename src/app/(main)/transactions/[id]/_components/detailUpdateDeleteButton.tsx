"use client";

import { useRouter } from "next/navigation";
import { SettingsModal } from "@/app/(main)/settings/_components/modals/modalIngredients";
import TransactionDeleteModal from "./transactionDeleteModal";

export default function DetailUpdateDeleteButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/transactions`)}
        className="cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white lg:rounded-md lg:px-3 lg:py-1.5 lg:text-xs"
      >
        취소
      </button>
      <button
        onClick={() => router.push(`/transactions/${id}/edit`)}
        className="cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white lg:rounded-md lg:px-3 lg:py-1.5 lg:text-xs"
      >
        수정
      </button>
      <SettingsModal.Root>
        <SettingsModal.Trigger className="cursor-pointer px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white lg:rounded-md lg:px-3 lg:py-1.5 lg:text-xs">
          삭제
        </SettingsModal.Trigger>
        <SettingsModal.Portal title="거래 삭제">
          <TransactionDeleteModal id={id} />
        </SettingsModal.Portal>
      </SettingsModal.Root>
    </div>
  );
}
