"use client";

import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/useAuth";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function NewTransactionButton({ className = "" }: Props) {
  const { data } = useAuth();
  return (
    <div className="px-3 pt-3">
      <Link
        href={data ? ROUTES.TRANSACTION_NEW : ROUTES.LOGIN}
        className={cn(
          "flex items-center justify-center gap-1 w-full py-2 bg-main text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors",
          className,
        )}
      >
        <Plus size={13} strokeWidth={2.5} /> 새 거래
      </Link>
    </div>
  );
}
