export default function SignupPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-150 w-full max-w-2xl bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="w-1/2 bg-main flex flex-col items-center justify-center text-white p-8">
          <h1 className="text-xl font-bold">MONEYLOG</h1>
          <p className="text-blue-100 text-xs mt-2 text-center">
            가입하고 지금 바로 시작하세요
          </p>
        </div>

        {/* Right form */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-xs space-y-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">회원가입</h2>
              <p className="text-xs text-gray-400 mt-1">새 계정을 만드세요</p>
            </div>

            {[
              { label: "이름", placeholder: "홍길동" },
              { label: "이메일", placeholder: "email@example.com" },
              { label: "비밀번호", placeholder: "••••••••" },
              { label: "비밀번호 확인", placeholder: "••••••••" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs text-gray-600 mb-1 block">
                  {field.label}
                </label>
                <div className="border border-gray-200 rounded-lg px-3 py-2">
                  <span className="text-sm text-gray-300">
                    {field.placeholder}
                  </span>
                </div>
              </div>
            ))}

            <div className="bg-main text-white px-3 py-1.5 text-sm rounded-md font-medium text-center cursor-pointer hover:bg-blue-600 transition-colors">
              가입하기
            </div>

            <p className="text-xs text-center text-gray-400">
              이미 계정이 있으신가요?{" "}
              <a href="/login" className="text-blue-500">
                로그인
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
