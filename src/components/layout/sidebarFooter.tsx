"use client";

import { useAuth } from "@/hooks/useAuth";

export default function SidebarFooter() {
  const { data: userData } = useAuth();

  return (
    <div className="p-3 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-gray-200 rounded-full shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-700 truncate">
            {userData?.user_metadata.full_name ?? ""}
          </p>
          <p className="text-[10px] text-gray-400 truncate">
            {userData?.email}
          </p>
        </div>
      </div>
    </div>
  );
}
