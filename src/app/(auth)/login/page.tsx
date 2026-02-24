"use client";

import { useState } from "react";
import { useLogin, useOAuthLogin } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useLogin();
  const oAuthLogin = useOAuthLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate({ email, password });
  };

  return (
    <div className="relative w-full h-full bg-white flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-8">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
            ₩
          </div>
          <h1 className="text-xl font-bold text-gray-800">MoneyLog</h1>
          <p className="text-xs text-gray-400 mt-1">나만의 똑똑한 가계부</p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <input
              className="text-xs text-gray-600 w-full bg-transparent focus:outline-none"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <input
              className="text-xs text-gray-600 w-full bg-transparent focus:outline-none"
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="bg-blue-500 text-white rounded-xl py-3 text-center text-sm font-semibold">
            <button onClick={handleSubmit} className="cursor-pointer w-full">
              로그인
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[11px] text-gray-400">또는</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social */}
        <div className="border border-gray-200 rounded-xl py-3 text-center text-xs text-gray-600">
          Google로 계속하기
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-blue-500 font-medium">
            회원가입
          </a>
        </p>
      </div>
    </div>
  );
}
