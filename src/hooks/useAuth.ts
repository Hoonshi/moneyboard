"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";

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
      router.replace("/dashboard");
      router.refresh();
    },
    onError: () => {
      toast.error("아이디 또는 비밀번호를 확인해주세요");
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
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      router.replace("/dashboard");
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

//유저 프로필 업데이트
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: name.trim() },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
