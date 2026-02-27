import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Target,
  CalendarDays,
  BarChart2,
  Settings,
  Plus,
} from "lucide-react";
import { SidebarList } from "./sidebarList";
import SidebarFooter from "./sidebarFooter";

const navItems = [
  { href: ROUTES.HOME, Icon: LayoutDashboard, label: "대시보드" },
  { href: ROUTES.TRANSACTIONS, Icon: ArrowLeftRight, label: "거래 내역" },
  { href: ROUTES.BUDGET, Icon: Target, label: "예산 관리" },
  { href: ROUTES.CALENDAR, Icon: CalendarDays, label: "캘린더" },
  { href: ROUTES.REPORTS, Icon: BarChart2, label: "리포트" },
  { href: ROUTES.SETTINGS, Icon: Settings, label: "설정" },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-52 shrink-0 bg-white border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="p-4 h-17 border-b border-gray-100">
        <Link href={ROUTES.HOME} className="flex items-center gap-2">
          <div className="w-7 h-7 bg-main rounded-lg flex items-center justify-center text-white text-xs font-bold">
            ₩
          </div>
          <span className="font-bold text-sm text-gray-800">MoneyLog</span>
        </Link>
      </div>

      {/* Quick add */}
      <div className="px-3 pt-3">
        <Link
          href={ROUTES.TRANSACTION_NEW}
          className="flex items-center justify-center gap-1 w-full py-2 bg-main text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> 새 거래
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 pt-3 space-y-0.5">
        {navItems.map((item) => (
          <SidebarList key={item.href} href={item.href}>
            <item.Icon size={15} />
            <span>{item.label}</span>
          </SidebarList>
        ))}
      </nav>

      {/* User footer */}
      <SidebarFooter />
    </aside>
  );
}
