"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// 이메일 로그인
export function useLogin() {
  const router = useRouter();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
}

// 회원가입
export function useSignUp() {
  const router = useRouter();
  const supabase = createClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // 이메일 인증이 필요한 경우 안내 페이지로
      // 인증 없이 바로 로그인되게 하려면 Supabase 대시보드에서
      // Authentication → Settings → "Confirm email" 끄면 됨
      router.push("/");
      router.refresh();
    },
  });
}

// 소셜 로그인 (Google, GitHub)
export function useOAuthLogin() {
  const supabase = createClient();

  return useMutation({
    mutationFn: async (provider: "google" | "github") => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });
      if (error) throw error;
      return data;
    },
  });
}

// 로그아웃
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear(); // 모든 캐시 초기화
      // router.push("/login");
      router.refresh();
    },
  });
}

export function useAuth() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      return user;
    },
  });
}
