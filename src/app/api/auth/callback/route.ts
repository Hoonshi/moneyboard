//Supabase OAuth 설정에서 콜백 URL을 /api/auth/callback으로 지정하게 되어 해당 경로 시용

// OAuth는 Google/GitHub 같은 외부 서비스에 로그인을 맡기는 방식임
// 로그인 성공 후 콜백 URL로 코드가 오고, 그걸 세션으로 교환함
// 이 파일은 그 교환을 처리하는 것

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(origin);
    }
  }

  // 에러 시 로그인 페이지로 리디렉션
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
