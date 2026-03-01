"use client";

import { useAuth } from "@/hooks/useAuth";

export default function SidebarFooter() {
  const { data: userData } = useAuth();

  return (
    <div className="p-3 border-t border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-500 select-none">
            {userData?.user_metadata?.full_name
              ? userData.user_metadata.full_name.charAt(0).toUpperCase()
              : userData?.email
                ? userData.email.charAt(0).toUpperCase()
                : ""}
          </span>
        </div>
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
