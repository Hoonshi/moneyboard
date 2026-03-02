"use client";

import { useAuth } from "@/hooks/useAuth";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function SidebarFooter() {
  const { data: userData } = useAuth();

  return (
    <div className=" border-t border-gray-100">
      <div className={`flex items-center gap-2 ${userData ? "p-3" : ""}`}>
        {/* 프로필부분 */}
        {userData ? (
          <div className=" w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-500 select-none">
              {userData?.user_metadata?.full_name
                ? userData.user_metadata.full_name.charAt(0).toUpperCase()
                : userData?.email
                  ? userData.email.charAt(0).toUpperCase()
                  : ""}
            </span>
          </div>
        ) : (
          <div className="w-52 px-3 pt-3">
            <Link
              href="/login"
              className="flex items-center justify-center gap-1 w-full py-2 bg-main text-white text-xs font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              <LogIn className="h-3" />
              로그인
            </Link>
          </div>
        )}
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
