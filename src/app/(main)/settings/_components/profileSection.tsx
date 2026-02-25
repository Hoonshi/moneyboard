import { ChevronRight, User } from 'lucide-react';

export function ProfileSection() {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center gap-3">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
        <User size={22} className="text-blue-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-gray-800">홍길동</p>
        <p className="text-[11px] text-gray-400">user@email.com</p>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  );
}
