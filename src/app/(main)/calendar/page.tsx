import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MobileShell } from '@/components/layout/mobile-shell';
import { CalendarGrid } from './_components/calendar-grid';
import { CalendarGridDesktop } from './_components/calendar-grid-desktop';

export default function CalendarPage() {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell
          title="캘린더"
          rightAction={
            <div className="flex items-center gap-1">
              <ChevronLeft size={16} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-700">2025.02</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          }
        >
          <div className="space-y-3 pt-2">
            <CalendarGrid />
          </div>
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">캘린더</h2>
            <p className="text-xs text-gray-400 mt-0.5">날짜별 거래 내역</p>
          </div>
          <div className="flex items-center gap-2">
            <ChevronLeft size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            <span className="text-xs font-bold text-gray-700">2025.02</span>
            <ChevronRight size={16} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          </div>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <CalendarGridDesktop />
        </div>
      </div>
    </div>
  );
}
