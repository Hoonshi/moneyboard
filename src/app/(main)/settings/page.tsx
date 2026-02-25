import { SettingsDesktop } from "./_components/settings-desktop";

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div>
          <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
            설정
          </h1>
          <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
            앱 설정 및 카테고리 관리
          </p>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <SettingsDesktop />
      </div>
    </div>
  );
}
