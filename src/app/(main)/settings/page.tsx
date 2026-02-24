import {
  ChevronRight,
  FolderOpen,
  RefreshCw,
  Moon,
  Bell,
  Upload,
  LogOut,
} from "lucide-react";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ProfileSection } from "./_components/profile-section";
import { SettingsDesktop } from "./_components/settings-desktop";

const MANAGE_MENU = [
  { Icon: FolderOpen, label: "카테고리 관리", sub: "13개" },
  { Icon: RefreshCw, label: "반복 거래 관리", sub: "3개" },
];

export default function SettingsPage() {
  return (
    <div className="h-full">
      {/* Mobile */}
      <div className="h-full lg:hidden">
        <MobileShell title="설정">
          <div className="space-y-4 pt-2">
            <ProfileSection />

            {/* 관리 */}
            <div className="bg-white rounded-xl overflow-hidden">
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold text-gray-400 uppercase">
                관리
              </p>
              {MANAGE_MENU.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50"
                >
                  <item.Icon size={16} className="text-gray-400" />
                  <span className="text-xs text-gray-700 flex-1">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-400 mr-1">
                    {item.sub}
                  </span>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              ))}
            </div>

            {/* 앱 설정 */}
            <div className="bg-white rounded-xl overflow-hidden">
              <p className="px-4 pt-3 pb-1.5 text-[10px] font-semibold text-gray-400 uppercase">
                앱 설정
              </p>
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
                <Moon size={16} className="text-gray-400" />
                <span className="text-xs text-gray-700 flex-1">다크 모드</span>
                <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-50">
                <Bell size={16} className="text-gray-400" />
                <span className="text-xs text-gray-700 flex-1">알림 설정</span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3.5">
                <Upload size={16} className="text-gray-400" />
                <span className="text-xs text-gray-700 flex-1">
                  데이터 내보내기
                </span>
                <ChevronRight size={14} className="text-gray-300" />
              </div>
            </div>

            {/* 로그아웃 */}
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5">
                <LogOut size={16} className="text-red-400" />
                <span className="text-xs text-red-500 flex-1">로그아웃</span>
              </div>
            </div>

            <p className="text-center text-[10px] text-gray-300 pt-2">
              MoneyLog v1.0.0
            </p>
          </div>
        </MobileShell>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col h-full bg-white">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-sm font-bold text-gray-800">설정</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              앱 설정 및 카테고리 관리
            </p>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-5">
          <SettingsDesktop />
        </div>
      </div>
    </div>
  );
}
