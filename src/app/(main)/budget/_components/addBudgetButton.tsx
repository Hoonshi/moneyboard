"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { BudgetForm } from "./budget-form";

export default function AddBudgetButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer flex items-center gap-1 text-xs text-white bg-main rounded-md px-3 py-1.5 hover:bg-blue-600"
      >
        <Plus size={13} strokeWidth={2.5} /> 예산 추가
      </button>

      {isOpen && (
        <BudgetForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
