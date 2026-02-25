"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Plus,
  Target,
  Settings,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

const tabs = [
  { href: ROUTES.HOME, Icon: LayoutDashboard, label: "홈" },
  { href: ROUTES.TRANSACTIONS, Icon: ArrowLeftRight, label: "내역" },
  { href: ROUTES.TRANSACTION_NEW, Icon: Plus, label: "", isCenter: true },
  { href: ROUTES.BUDGET, Icon: Target, label: "예산" },
  { href: ROUTES.SETTINGS, Icon: Settings, label: "더보기" },
];

export function MobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-100 px-2 pb-1 pt-1.5 flex items-end justify-around z-50">
      {tabs.map((tab) =>
        tab.isCenter ? (
          <Link
            key={tab.href}
            href={tab.href}
            className="w-12 h-12 -mt-4 bg-main rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200"
          >
            <tab.Icon size={22} strokeWidth={2.5} />
          </Link>
        ) : (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 ${
              isActive(tab.href) ? "text-blue-500" : "text-gray-400"
            }`}
          >
            <tab.Icon size={20} strokeWidth={isActive(tab.href) ? 2.5 : 1.8} />
            <span className="text-[10px]">{tab.label}</span>
          </Link>
        ),
      )}
    </div>
  );
}
