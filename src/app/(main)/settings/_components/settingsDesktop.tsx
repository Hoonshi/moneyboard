import { User, Utensils, Car, Home, Gamepad2, Moon } from "lucide-react";
import type { ElementType } from "react";

const CATEGORIES: { Icon: ElementType; name: string; count: number }[] = [
  { Icon: Utensils, name: "식비", count: 45 },
  { Icon: Car, name: "교통", count: 23 },
  { Icon: Home, name: "주거/공과금", count: 8 },
  { Icon: Gamepad2, name: "여가/문화", count: 15 },
];

export function SettingsDesktop() {
  return (
    <div className="max-w-lg space-y-5">
      {/* Profile */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          프로필
        </span>
        <div className="mt-2 flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">홍길동</p>
            <p className="text-xs text-gray-400">user@email.com</p>
          </div>
          <div className="ml-auto">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600 cursor-pointer">
              프로필 수정
            </span>
          </div>
        </div>
      </div>

      {/* Category Management */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          카테고리 관리
        </span>
        <div className="mt-2 space-y-1.5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gray-50"
            >
              <cat.Icon size={14} className="text-gray-400 shrink-0" />
              <span className="text-xs font-medium text-gray-700 flex-1">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400">{cat.count}건</span>
              <span className="text-xs text-blue-500 cursor-pointer">수정</span>
              <span className="text-xs text-red-400 cursor-pointer">삭제</span>
            </div>
          ))}
        </div>
        <div className="mt-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-main text-white cursor-pointer">
            + 카테고리 추가
          </span>
        </div>
      </div>

      {/* Account */}
      <div className="border border-gray-200 rounded-lg p-3">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
          계정
        </span>
        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2">
              <Moon size={14} className="text-gray-400" />
              <span className="text-xs text-gray-600">다크 모드</span>
            </div>
            <div className="w-8 h-4 bg-gray-200 rounded-full relative">
              <div className="w-3.5 h-3.5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm" />
            </div>
          </div>
          <div className="border-t border-gray-100 pt-2">
            <span className="text-xs text-red-400 cursor-pointer">
              로그아웃
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
