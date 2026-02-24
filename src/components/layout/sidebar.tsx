'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import {
  LayoutDashboard, ArrowLeftRight, Target,
  CalendarDays, BarChart2, Settings, Plus,
} from 'lucide-react';

const navItems = [
  { href: ROUTES.HOME,         Icon: LayoutDashboard, label: '대시보드' },
  { href: ROUTES.TRANSACTIONS, Icon: ArrowLeftRight,  label: '거래 내역' },
  { href: ROUTES.BUDGET,       Icon: Target,          label: '예산 관리' },
  { href: ROUTES.CALENDAR,     Icon: CalendarDays,    label: '캘린더'   },
  { href: ROUTES.REPORTS,      Icon: BarChart2,       label: '리포트'   },
  { href: ROUTES.SETTINGS,     Icon: Settings,        label: '설정'     },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex flex-col w-52 shrink-0 bg-white border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
            ₩
          </div>
          <span className="font-bold text-sm text-gray-800">MoneyLog</span>
        </div>
      </div>

      {/* Quick add */}
      <div className="px-3 pt-3">
        <Link
          href={ROUTES.TRANSACTION_NEW}
          className="flex items-center justify-center gap-1 w-full py-2 bg-blue-500 text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={13} strokeWidth={2.5} /> 새 거래
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 pt-3 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-600 font-semibold'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <item.Icon size={15} strokeWidth={active ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-200 rounded-full shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">홍길동</p>
            <p className="text-[10px] text-gray-400 truncate">user@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
